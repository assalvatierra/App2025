using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DBServices;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;
using Moq;

namespace AngularApp1.Server.Tests.DBServices
{
    public class JobMainsServiceTests
    {
        private readonly Mock<IJobMainsDbLayer> _mockDb;
        private readonly JobMainsService _service;

        public JobMainsServiceTests()
        {
            _mockDb = new Mock<IJobMainsDbLayer>();
            _service = new JobMainsService(_mockDb.Object);
        }

        // ── GetAllAsync ──────────────────────────────────────────────────────

        [Fact]
        public async Task GetAllAsync_ReturnsList()
        {
            _mockDb.Setup(d => d.GetAllAsync())
                   .ReturnsAsync([new JobMain { Id = 1 }, new JobMain { Id = 2 }]);

            var result = await _service.GetAllAsync();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsEmpty()
        {
            _mockDb.Setup(d => d.GetAllAsync()).ReturnsAsync([]);

            var result = await _service.GetAllAsync();

            Assert.Empty(result);
        }

        // ── GetListAsync ─────────────────────────────────────────────────────

        [Fact]
        public async Task GetListAsync_MapsDtoFieldsCorrectly()
        {
            var jobDate = new DateTime(2024, 1, 15);
            SetupGetListMocks(
                jobs:
                [
                    new JobMain
                    {
                        Id = 1,
                        JobDate = jobDate,
                        Description = "Test Job",
                        CreatedBy = "user1",
                        CreatedOn = jobDate,
                        LastEditBy = "user1",
                        LastEditOn = jobDate,
                        ItemStatusId = 10,
                        BusinessUnitId = 5,
                        BusinessUnit = new BusinessUnit { Id = 5, Name = "BU Alpha" },
                        JobCustomers = []
                    }
                ],
                jobStatuses: [],
                itemStatuses: [],
                checklistTransactions: []
            );

            var result = await _service.GetListAsync();

            Assert.Single(result);
            var dto = result[0];
            Assert.Equal(1, dto.Id);
            Assert.Equal(jobDate, dto.JobDate);
            Assert.Equal("Test Job", dto.Description);
            Assert.Equal("BU Alpha", dto.BusinessUnitName);
            Assert.Equal(5, dto.BusinessUnitId);
        }

        [Fact]
        public async Task GetListAsync_CalculatesProgress_50Percent()
        {
            SetupGetListMocks(
                jobs: [new JobMain { Id = 1, JobCustomers = [] }],
                jobStatuses: [],
                itemStatuses: [],
                checklistTransactions:
                [
                    new ChecklistTransaction { RefId = 1, RefObject = "JOB", IsDone = true },
                    new ChecklistTransaction { RefId = 1, RefObject = "JOB", IsDone = false }
                ]
            );

            var result = await _service.GetListAsync();

            Assert.Equal(50, result[0].Progress);
        }

        [Fact]
        public async Task GetListAsync_ProgressIsNull_WhenNoChecklistItems()
        {
            SetupGetListMocks(
                jobs: [new JobMain { Id = 1, JobCustomers = [] }],
                jobStatuses: [],
                itemStatuses: [],
                checklistTransactions: []
            );

            var result = await _service.GetListAsync();

            Assert.Null(result[0].Progress);
        }

        [Fact]
        public async Task GetListAsync_PicksPrimaryCustomerName()
        {
            SetupGetListMocks(
                jobs:
                [
                    new JobMain
                    {
                        Id = 1,
                        JobCustomers =
                        [
                            new JobCustomer { IsPrimary = false, Customer = new Entity { Name = "Secondary Co" } },
                            new JobCustomer { IsPrimary = true,  Customer = new Entity { Name = "Primary Co" } }
                        ]
                    }
                ],
                jobStatuses: [],
                itemStatuses: [],
                checklistTransactions: []
            );

            var result = await _service.GetListAsync();

            Assert.Equal("Primary Co", result[0].PrimaryCustomerName);
        }

        [Fact]
        public async Task GetListAsync_PicksLatestStatusName()
        {
            var older = new DateTime(2024, 1, 1);
            var newer = new DateTime(2024, 6, 1);

            SetupGetListMocks(
                jobs: [new JobMain { Id = 1, JobCustomers = [] }],
                jobStatuses:
                [
                    new JobMainStatus { JobMainId = 1, ItemStatusId = 10, CreatedOn = older },
                    new JobMainStatus { JobMainId = 1, ItemStatusId = 20, CreatedOn = newer }
                ],
                itemStatuses:
                [
                    new ItemStatus { Id = 10, Name = "Old Status" },
                    new ItemStatus { Id = 20, Name = "New Status" }
                ],
                checklistTransactions: []
            );

            var result = await _service.GetListAsync();

            Assert.Equal("New Status", result[0].LatestStatusName);
        }

        [Fact]
        public async Task GetListAsync_LatestStatusNameEmpty_WhenNoStatuses()
        {
            SetupGetListMocks(
                jobs: [new JobMain { Id = 1, JobCustomers = [] }],
                jobStatuses: [],
                itemStatuses: [],
                checklistTransactions: []
            );

            var result = await _service.GetListAsync();

            Assert.Equal(string.Empty, result[0].LatestStatusName);
        }

        // ── GetByIdAsync ─────────────────────────────────────────────────────

        [Fact]
        public async Task GetByIdAsync_ReturnsJob_WhenFound()
        {
            _mockDb.Setup(d => d.GetByIdAsync(1)).ReturnsAsync(new JobMain { Id = 1 });

            var result = await _service.GetByIdAsync(1);

            Assert.NotNull(result);
            Assert.Equal(1, result!.Id);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsNull_WhenNotFound()
        {
            _mockDb.Setup(d => d.GetByIdAsync(99)).ReturnsAsync((JobMain?)null);

            var result = await _service.GetByIdAsync(99);

            Assert.Null(result);
        }

        // ── AddAsync ─────────────────────────────────────────────────────────

        [Fact]
        public async Task AddAsync_ReturnsAddedJob()
        {
            var job = new JobMain { Id = 5, Description = "New Job" };
            _mockDb.Setup(d => d.AddAsync(job)).ReturnsAsync(job);

            var result = await _service.AddAsync(job);

            Assert.Equal(5, result.Id);
            _mockDb.Verify(d => d.AddAsync(job), Times.Once);
        }

        // ── UpdateAsync ──────────────────────────────────────────────────────

        [Fact]
        public async Task UpdateAsync_DelegatesToDbLayer()
        {
            var job = new JobMain { Id = 3 };
            _mockDb.Setup(d => d.UpdateAsync(job)).Returns(Task.CompletedTask);

            await _service.UpdateAsync(job);

            _mockDb.Verify(d => d.UpdateAsync(job), Times.Once);
        }

        // ── DeleteAsync ──────────────────────────────────────────────────────

        [Fact]
        public async Task DeleteAsync_DelegatesToDbLayer()
        {
            var job = new JobMain { Id = 4 };
            _mockDb.Setup(d => d.DeleteAsync(job)).Returns(Task.CompletedTask);

            await _service.DeleteAsync(job);

            _mockDb.Verify(d => d.DeleteAsync(job), Times.Once);
        }

        // ── Exists ───────────────────────────────────────────────────────────

        [Fact]
        public void Exists_ReturnsTrue_WhenJobExists()
        {
            _mockDb.Setup(d => d.Exists(1)).Returns(true);

            Assert.True(_service.Exists(1));
        }

        [Fact]
        public void Exists_ReturnsFalse_WhenJobNotFound()
        {
            _mockDb.Setup(d => d.Exists(99)).Returns(false);

            Assert.False(_service.Exists(99));
        }

        // ── Helpers ──────────────────────────────────────────────────────────

        private void SetupGetListMocks(
            List<JobMain> jobs,
            List<JobMainStatus> jobStatuses,
            List<ItemStatus> itemStatuses,
            List<ChecklistTransaction> checklistTransactions)
        {
            var jobIds = jobs.Select(j => j.Id).ToList();
            var statusIds = jobStatuses
                .Select(s => s.ItemStatusId)
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .Distinct()
                .ToList();

            _mockDb.Setup(d => d.GetJobsWithDetailsAsync()).ReturnsAsync(jobs);
            _mockDb.Setup(d => d.GetJobStatusesByJobIdsAsync(jobIds)).ReturnsAsync(jobStatuses);
            _mockDb.Setup(d => d.GetItemStatusesByIdsAsync(It.IsAny<List<int>>())).ReturnsAsync(itemStatuses);
            _mockDb.Setup(d => d.GetChecklistTransactionsByJobIdsAsync(jobIds)).ReturnsAsync(checklistTransactions);
        }
    }
}
