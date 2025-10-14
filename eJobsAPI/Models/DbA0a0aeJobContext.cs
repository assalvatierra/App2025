using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace eJobs.Model;

public partial class DbA0a0aeJobContext : DbContext
{
    public DbA0a0aeJobContext(DbContextOptions<DbA0a0aeJobContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AccntCategory> AccntCategories { get; set; }

    public virtual DbSet<AccntLedger> AccntLedgers { get; set; }

    public virtual DbSet<AccntMain> AccntMains { get; set; }

    public virtual DbSet<AccntTrxDtl> AccntTrxDtls { get; set; }

    public virtual DbSet<AccntTrxHdr> AccntTrxHdrs { get; set; }

    public virtual DbSet<AccntTrxHist> AccntTrxHists { get; set; }

    public virtual DbSet<AccntTrxType> AccntTrxTypes { get; set; }

    public virtual DbSet<AccntType> AccntTypes { get; set; }

    public virtual DbSet<AdminEmail> AdminEmails { get; set; }

    public virtual DbSet<ApAccStatus> ApAccStatuses { get; set; }

    public virtual DbSet<ApAccount> ApAccounts { get; set; }

    public virtual DbSet<ApAction> ApActions { get; set; }

    public virtual DbSet<ApActionItem> ApActionItems { get; set; }

    public virtual DbSet<ApCashFlow> ApCashFlows { get; set; }

    public virtual DbSet<ApCashFlowPostGroup> ApCashFlowPostGroups { get; set; }

    public virtual DbSet<ApCashFlowType> ApCashFlowTypes { get; set; }

    public virtual DbSet<ApPayment> ApPayments { get; set; }

    public virtual DbSet<ApPaymentStatus> ApPaymentStatuses { get; set; }

    public virtual DbSet<ApPaymentType> ApPaymentTypes { get; set; }

    public virtual DbSet<ApPrintRequest> ApPrintRequests { get; set; }

    public virtual DbSet<ApTransCategory> ApTransCategories { get; set; }

    public virtual DbSet<ApTransItem> ApTransItems { get; set; }

    public virtual DbSet<ApTransPayment> ApTransPayments { get; set; }

    public virtual DbSet<ApTransPost> ApTransPosts { get; set; }

    public virtual DbSet<ApTransPrintReq> ApTransPrintReqs { get; set; }

    public virtual DbSet<ApTransRepeat> ApTransRepeats { get; set; }

    public virtual DbSet<ApTransStatus> ApTransStatuses { get; set; }

    public virtual DbSet<ApTransType> ApTransTypes { get; set; }

    public virtual DbSet<ApTransaction> ApTransactions { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AppointmentAcctType> AppointmentAcctTypes { get; set; }

    public virtual DbSet<AppointmentRequest> AppointmentRequests { get; set; }

    public virtual DbSet<AppointmentSlot> AppointmentSlots { get; set; }

    public virtual DbSet<AppointmentStatus> AppointmentStatuses { get; set; }

    public virtual DbSet<ArAccContact> ArAccContacts { get; set; }

    public virtual DbSet<ArAccStatus> ArAccStatuses { get; set; }

    public virtual DbSet<ArAccntCredit> ArAccntCredits { get; set; }

    public virtual DbSet<ArAccntTerm> ArAccntTerms { get; set; }

    public virtual DbSet<ArAccntTermStatus> ArAccntTermStatuses { get; set; }

    public virtual DbSet<ArAccount> ArAccounts { get; set; }

    public virtual DbSet<ArAction> ArActions { get; set; }

    public virtual DbSet<ArActionItem> ArActionItems { get; set; }

    public virtual DbSet<ArCategory> ArCategories { get; set; }

    public virtual DbSet<ArCreditStatus> ArCreditStatuses { get; set; }

    public virtual DbSet<ArDeposit> ArDeposits { get; set; }

    public virtual DbSet<ArDepositBank> ArDepositBanks { get; set; }

    public virtual DbSet<ArPayment> ArPayments { get; set; }

    public virtual DbSet<ArPaymentType> ArPaymentTypes { get; set; }

    public virtual DbSet<ArTransDeposit> ArTransDeposits { get; set; }

    public virtual DbSet<ArTransPayment> ArTransPayments { get; set; }

    public virtual DbSet<ArTransPost> ArTransPosts { get; set; }

    public virtual DbSet<ArTransRepeat> ArTransRepeats { get; set; }

    public virtual DbSet<ArTransStatus> ArTransStatuses { get; set; }

    public virtual DbSet<ArTransaction> ArTransactions { get; set; }

    public virtual DbSet<AsCostCenter> AsCostCenters { get; set; }

    public virtual DbSet<AsExpBiller> AsExpBillers { get; set; }

    public virtual DbSet<AsExpCategory> AsExpCategories { get; set; }

    public virtual DbSet<AsExpense> AsExpenses { get; set; }

    public virtual DbSet<AsIncCategory> AsIncCategories { get; set; }

    public virtual DbSet<AsIncClient> AsIncClients { get; set; }

    public virtual DbSet<AsSale> AsSales { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<Bank> Banks { get; set; }

    public virtual DbSet<BlasterLog> BlasterLogs { get; set; }

    public virtual DbSet<Branch> Branches { get; set; }

    public virtual DbSet<CarCategory> CarCategories { get; set; }

    public virtual DbSet<CarDestination> CarDestinations { get; set; }

    public virtual DbSet<CarDetail> CarDetails { get; set; }

    public virtual DbSet<CarImage> CarImages { get; set; }

    public virtual DbSet<CarRate> CarRates { get; set; }

    public virtual DbSet<CarRateGroup> CarRateGroups { get; set; }

    public virtual DbSet<CarRatePackage> CarRatePackages { get; set; }

    public virtual DbSet<CarRateUnitPackage> CarRateUnitPackages { get; set; }

    public virtual DbSet<CarResPackage> CarResPackages { get; set; }

    public virtual DbSet<CarResType> CarResTypes { get; set; }

    public virtual DbSet<CarReservation> CarReservations { get; set; }

    public virtual DbSet<CarUnit> CarUnits { get; set; }

    public virtual DbSet<CarUnitMeta> CarUnitMetas { get; set; }

    public virtual DbSet<CarViewPage> CarViewPages { get; set; }

    public virtual DbSet<CashExpense> CashExpenses { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<CoopMember> CoopMembers { get; set; }

    public virtual DbSet<CoopMemberItem> CoopMemberItems { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<CrCashReqStatus> CrCashReqStatuses { get; set; }

    public virtual DbSet<CrLogCashGroup> CrLogCashGroups { get; set; }

    public virtual DbSet<CrLogCashRelease> CrLogCashReleases { get; set; }

    public virtual DbSet<CrLogCashSalary> CrLogCashSalaries { get; set; }

    public virtual DbSet<CrLogCashStatus> CrLogCashStatuses { get; set; }

    public virtual DbSet<CrLogCashType> CrLogCashTypes { get; set; }

    public virtual DbSet<CrLogClosing> CrLogClosings { get; set; }

    public virtual DbSet<CrLogCompany> CrLogCompanies { get; set; }

    public virtual DbSet<CrLogCompanyRate> CrLogCompanyRates { get; set; }

    public virtual DbSet<CrLogDriver> CrLogDrivers { get; set; }

    public virtual DbSet<CrLogDriverPayment> CrLogDriverPayments { get; set; }

    public virtual DbSet<CrLogDriverTerm> CrLogDriverTerms { get; set; }

    public virtual DbSet<CrLogFuel> CrLogFuels { get; set; }

    public virtual DbSet<CrLogFuelStatus> CrLogFuelStatuses { get; set; }

    public virtual DbSet<CrLogOdo> CrLogOdoes { get; set; }

    public virtual DbSet<CrLogOwner> CrLogOwners { get; set; }

    public virtual DbSet<CrLogPassRemark> CrLogPassRemarks { get; set; }

    public virtual DbSet<CrLogPassStatus> CrLogPassStatuses { get; set; }

    public virtual DbSet<CrLogPassenger> CrLogPassengers { get; set; }

    public virtual DbSet<CrLogPassengerArea> CrLogPassengerAreas { get; set; }

    public virtual DbSet<CrLogPassengerMaster> CrLogPassengerMasters { get; set; }

    public virtual DbSet<CrLogPaymentType> CrLogPaymentTypes { get; set; }

    public virtual DbSet<CrLogTrip> CrLogTrips { get; set; }

    public virtual DbSet<CrLogTripJobMain> CrLogTripJobMains { get; set; }

    public virtual DbSet<CrLogType> CrLogTypes { get; set; }

    public virtual DbSet<CrLogUnit> CrLogUnits { get; set; }

    public virtual DbSet<CrRptUnit> CrRptUnits { get; set; }

    public virtual DbSet<CrRptUnitExpense> CrRptUnitExpenses { get; set; }

    public virtual DbSet<CustCat> CustCats { get; set; }

    public virtual DbSet<CustCategory> CustCategories { get; set; }

    public virtual DbSet<CustEntAccountType> CustEntAccountTypes { get; set; }

    public virtual DbSet<CustEntActActionCode> CustEntActActionCodes { get; set; }

    public virtual DbSet<CustEntActActionStatus> CustEntActActionStatuses { get; set; }

    public virtual DbSet<CustEntActStatus> CustEntActStatuses { get; set; }

    public virtual DbSet<CustEntActType> CustEntActTypes { get; set; }

    public virtual DbSet<CustEntActivity> CustEntActivities { get; set; }

    public virtual DbSet<CustEntActivityType> CustEntActivityTypes { get; set; }

    public virtual DbSet<CustEntAddress> CustEntAddresses { get; set; }

    public virtual DbSet<CustEntAssign> CustEntAssigns { get; set; }

    public virtual DbSet<CustEntCat> CustEntCats { get; set; }

    public virtual DbSet<CustEntClause> CustEntClauses { get; set; }

    public virtual DbSet<CustEntDocument> CustEntDocuments { get; set; }

    public virtual DbSet<CustEntMain> CustEntMains { get; set; }

    public virtual DbSet<CustEntity> CustEntities { get; set; }

    public virtual DbSet<CustFile> CustFiles { get; set; }

    public virtual DbSet<CustFileRef> CustFileRefs { get; set; }

    public virtual DbSet<CustNotif> CustNotifs { get; set; }

    public virtual DbSet<CustNotifActivity> CustNotifActivities { get; set; }

    public virtual DbSet<CustNotifRecipient> CustNotifRecipients { get; set; }

    public virtual DbSet<CustNotifRecipientList> CustNotifRecipientLists { get; set; }

    public virtual DbSet<CustSalesCategory> CustSalesCategories { get; set; }

    public virtual DbSet<CustSocialAcc> CustSocialAccs { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Destination> Destinations { get; set; }

    public virtual DbSet<DriverInsJobService> DriverInsJobServices { get; set; }

    public virtual DbSet<DriverInstruction> DriverInstructions { get; set; }

    public virtual DbSet<EmailBlasterLog> EmailBlasterLogs { get; set; }

    public virtual DbSet<EmailBlasterTemplate> EmailBlasterTemplates { get; set; }

    public virtual DbSet<EntAddress> EntAddresses { get; set; }

    public virtual DbSet<EntBusiness> EntBusinesses { get; set; }

    public virtual DbSet<EntContact> EntContacts { get; set; }

    public virtual DbSet<EntService> EntServices { get; set; }

    public virtual DbSet<EntSetting> EntSettings { get; set; }

    public virtual DbSet<EntSupportFile> EntSupportFiles { get; set; }

    public virtual DbSet<Expense> Expenses { get; set; }

    public virtual DbSet<ExpensesCategory> ExpensesCategories { get; set; }

    public virtual DbSet<HrDtr> HrDtrs { get; set; }

    public virtual DbSet<HrDtrStatus> HrDtrStatuses { get; set; }

    public virtual DbSet<HrPayroll> HrPayrolls { get; set; }

    public virtual DbSet<HrPerDoc> HrPerDocs { get; set; }

    public virtual DbSet<HrPerPosition> HrPerPositions { get; set; }

    public virtual DbSet<HrPerSkill> HrPerSkills { get; set; }

    public virtual DbSet<HrPerTraining> HrPerTrainings { get; set; }

    public virtual DbSet<HrPersonel> HrPersonels { get; set; }

    public virtual DbSet<HrPersonelStatus> HrPersonelStatuses { get; set; }

    public virtual DbSet<HrPosition> HrPositions { get; set; }

    public virtual DbSet<HrProficiency> HrProficiencies { get; set; }

    public virtual DbSet<HrProfile> HrProfiles { get; set; }

    public virtual DbSet<HrSalary> HrSalaries { get; set; }

    public virtual DbSet<HrSkill> HrSkills { get; set; }

    public virtual DbSet<HrTraining> HrTrainings { get; set; }

    public virtual DbSet<HrTrainingSkill> HrTrainingSkills { get; set; }

    public virtual DbSet<InvCarGateControl> InvCarGateControls { get; set; }

    public virtual DbSet<InvCarMntPriority> InvCarMntPriorities { get; set; }

    public virtual DbSet<InvCarMntRcmd> InvCarMntRcmds { get; set; }

    public virtual DbSet<InvCarRcmdRequest> InvCarRcmdRequests { get; set; }

    public virtual DbSet<InvCarRcmdStatus> InvCarRcmdStatuses { get; set; }

    public virtual DbSet<InvCarRecord> InvCarRecords { get; set; }

    public virtual DbSet<InvCarRecordType> InvCarRecordTypes { get; set; }

    public virtual DbSet<InvItem> InvItems { get; set; }

    public virtual DbSet<InvItemCat> InvItemCats { get; set; }

    public virtual DbSet<InvItemCategory> InvItemCategories { get; set; }

    public virtual DbSet<InvItemCrLogUnit> InvItemCrLogUnits { get; set; }

    public virtual DbSet<JobAction> JobActions { get; set; }

    public virtual DbSet<JobChecklist> JobChecklists { get; set; }

    public virtual DbSet<JobContact> JobContacts { get; set; }

    public virtual DbSet<JobEntMain> JobEntMains { get; set; }

    public virtual DbSet<JobExpense> JobExpenses { get; set; }

    public virtual DbSet<JobItinerary> JobItineraries { get; set; }

    public virtual DbSet<JobMain> JobMains { get; set; }

    public virtual DbSet<JobMainPaymentStatus> JobMainPaymentStatuses { get; set; }

    public virtual DbSet<JobNote> JobNotes { get; set; }

    public virtual DbSet<JobNotificationRequest> JobNotificationRequests { get; set; }

    public virtual DbSet<JobPayment> JobPayments { get; set; }

    public virtual DbSet<JobPaymentStatus> JobPaymentStatuses { get; set; }

    public virtual DbSet<JobPaymentType> JobPaymentTypes { get; set; }

    public virtual DbSet<JobPickup> JobPickups { get; set; }

    public virtual DbSet<JobPost> JobPosts { get; set; }

    public virtual DbSet<JobPostSale> JobPostSales { get; set; }

    public virtual DbSet<JobService> JobServices { get; set; }

    public virtual DbSet<JobServiceItem> JobServiceItems { get; set; }

    public virtual DbSet<JobServicePickup> JobServicePickups { get; set; }

    public virtual DbSet<JobStatus> JobStatuses { get; set; }

    public virtual DbSet<JobThru> JobThrus { get; set; }

    public virtual DbSet<JobTrail> JobTrails { get; set; }

    public virtual DbSet<JobType> JobTypes { get; set; }

    public virtual DbSet<JobVehicle> JobVehicles { get; set; }

    public virtual DbSet<MigrationHistory> MigrationHistories { get; set; }

    public virtual DbSet<OnlineReservation> OnlineReservations { get; set; }

    public virtual DbSet<PaypalAccount> PaypalAccounts { get; set; }

    public virtual DbSet<PaypalTransaction> PaypalTransactions { get; set; }

    public virtual DbSet<PortalCustomer> PortalCustomers { get; set; }

    public virtual DbSet<PreDefinedNote> PreDefinedNotes { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<ProductCondition> ProductConditions { get; set; }

    public virtual DbSet<ProductImages1> ProductImages1s { get; set; }

    public virtual DbSet<ProductPrice> ProductPrices { get; set; }

    public virtual DbSet<ProductProdCat> ProductProdCats { get; set; }

    public virtual DbSet<RateGroup> RateGroups { get; set; }

    public virtual DbSet<RsvPayment> RsvPayments { get; set; }

    public virtual DbSet<SalesActCode> SalesActCodes { get; set; }

    public virtual DbSet<SalesActStatus> SalesActStatuses { get; set; }

    public virtual DbSet<SalesActivity> SalesActivities { get; set; }

    public virtual DbSet<SalesLead> SalesLeads { get; set; }

    public virtual DbSet<SalesLeadCatCode> SalesLeadCatCodes { get; set; }

    public virtual DbSet<SalesLeadCategory> SalesLeadCategories { get; set; }

    public virtual DbSet<SalesLeadCompany> SalesLeadCompanies { get; set; }

    public virtual DbSet<SalesLeadFile> SalesLeadFiles { get; set; }

    public virtual DbSet<SalesLeadItem> SalesLeadItems { get; set; }

    public virtual DbSet<SalesLeadLink> SalesLeadLinks { get; set; }

    public virtual DbSet<SalesLeadQuotedItem> SalesLeadQuotedItems { get; set; }

    public virtual DbSet<SalesLeadQuotedItemStatus> SalesLeadQuotedItemStatuses { get; set; }

    public virtual DbSet<SalesLeadSupActivity> SalesLeadSupActivities { get; set; }

    public virtual DbSet<SalesProcStatus> SalesProcStatuses { get; set; }

    public virtual DbSet<SalesProcStatusCode> SalesProcStatusCodes { get; set; }

    public virtual DbSet<SalesStatus> SalesStatuses { get; set; }

    public virtual DbSet<SalesStatusCode> SalesStatusCodes { get; set; }

    public virtual DbSet<SalesStatusStatus> SalesStatusStatuses { get; set; }

    public virtual DbSet<SalesStatusType> SalesStatusTypes { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<SmBranch> SmBranches { get; set; }

    public virtual DbSet<SmCategory> SmCategories { get; set; }

    public virtual DbSet<SmFile> SmFiles { get; set; }

    public virtual DbSet<SmProdAd> SmProdAds { get; set; }

    public virtual DbSet<SmProdCat> SmProdCats { get; set; }

    public virtual DbSet<SmProdDesc> SmProdDescs { get; set; }

    public virtual DbSet<SmProdInfo> SmProdInfoes { get; set; }

    public virtual DbSet<SmProdStatus> SmProdStatuses { get; set; }

    public virtual DbSet<SmProdSupplier> SmProdSuppliers { get; set; }

    public virtual DbSet<SmProduct> SmProducts { get; set; }

    public virtual DbSet<SmRate> SmRates { get; set; }

    public virtual DbSet<SmRateUoM> SmRateUoMs { get; set; }

    public virtual DbSet<SmSupplier> SmSuppliers { get; set; }

    public virtual DbSet<SmSupplierInfo> SmSupplierInfoes { get; set; }

    public virtual DbSet<SrvActionCode> SrvActionCodes { get; set; }

    public virtual DbSet<SrvActionItem> SrvActionItems { get; set; }

    public virtual DbSet<SupDocument> SupDocuments { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<SupplierActActionCode> SupplierActActionCodes { get; set; }

    public virtual DbSet<SupplierActActionStatus> SupplierActActionStatuses { get; set; }

    public virtual DbSet<SupplierActStatus> SupplierActStatuses { get; set; }

    public virtual DbSet<SupplierActivity> SupplierActivities { get; set; }

    public virtual DbSet<SupplierContact> SupplierContacts { get; set; }

    public virtual DbSet<SupplierContactStatus> SupplierContactStatuses { get; set; }

    public virtual DbSet<SupplierDocument> SupplierDocuments { get; set; }

    public virtual DbSet<SupplierInvItem> SupplierInvItems { get; set; }

    public virtual DbSet<SupplierItem> SupplierItems { get; set; }

    public virtual DbSet<SupplierItemRate> SupplierItemRates { get; set; }

    public virtual DbSet<SupplierPoDtl> SupplierPoDtls { get; set; }

    public virtual DbSet<SupplierPoHdr> SupplierPoHdrs { get; set; }

    public virtual DbSet<SupplierPoItem> SupplierPoItems { get; set; }

    public virtual DbSet<SupplierPoStatus> SupplierPoStatuses { get; set; }

    public virtual DbSet<SupplierType> SupplierTypes { get; set; }

    public virtual DbSet<SupplierUnit> SupplierUnits { get; set; }

    public virtual DbSet<SysAccessRole> SysAccessRoles { get; set; }

    public virtual DbSet<SysAccessUser> SysAccessUsers { get; set; }

    public virtual DbSet<SysCmdIdRef> SysCmdIdRefs { get; set; }

    public virtual DbSet<SysMenu> SysMenus { get; set; }

    public virtual DbSet<SysService> SysServices { get; set; }

    public virtual DbSet<SysServiceMenu> SysServiceMenus { get; set; }

    public virtual DbSet<SysSetting> SysSettings { get; set; }

    public virtual DbSet<SysSetupType> SysSetupTypes { get; set; }

    public virtual DbSet<TpArea> TpAreas { get; set; }

    public virtual DbSet<TpCategory> TpCategories { get; set; }

    public virtual DbSet<TpInqService> TpInqServices { get; set; }

    public virtual DbSet<TpInquiry> TpInquiries { get; set; }

    public virtual DbSet<TpProdCat> TpProdCats { get; set; }

    public virtual DbSet<TpProdRate> TpProdRates { get; set; }

    public virtual DbSet<TpProduct> TpProducts { get; set; }

    public virtual DbSet<TpProductDesc> TpProductDescs { get; set; }

    public virtual DbSet<TpProductImage> TpProductImages { get; set; }

    public virtual DbSet<TpUom> TpUoms { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    public virtual DbSet<VehicleBrand> VehicleBrands { get; set; }

    public virtual DbSet<VehicleDrife> VehicleDrives { get; set; }

    public virtual DbSet<VehicleFuel> VehicleFuels { get; set; }

    public virtual DbSet<VehicleModel> VehicleModels { get; set; }

    public virtual DbSet<VehicleTransmission> VehicleTransmissions { get; set; }

    public virtual DbSet<VehicleType> VehicleTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AccntCategory>(entity =>
        {
            entity.HasIndex(e => e.AccntTypeId, "IX_FK_AccntTypeAccntCategory");

            entity.Property(e => e.Code).HasMaxLength(5);
            entity.Property(e => e.Description).HasMaxLength(80);

            entity.HasOne(d => d.AccntType).WithMany(p => p.AccntCategories)
                .HasForeignKey(d => d.AccntTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntTypeAccntCategory");
        });

        modelBuilder.Entity<AccntLedger>(entity =>
        {
            entity.HasIndex(e => e.AccntMainId, "IX_FK_AccntMainAccntLedger");

            entity.Property(e => e.Code).HasMaxLength(4);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(200);

            entity.HasOne(d => d.AccntMain).WithMany(p => p.AccntLedgers)
                .HasForeignKey(d => d.AccntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntMainAccntLedger");
        });

        modelBuilder.Entity<AccntMain>(entity =>
        {
            entity.HasIndex(e => e.AccntCategoryId, "IX_FK_AccntCategoryAccntMain");

            entity.HasIndex(e => e.AccntTypeId, "IX_FK_AccntTypeAccntMain");

            entity.Property(e => e.Code).HasMaxLength(5);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(200);

            entity.HasOne(d => d.AccntCategory).WithMany(p => p.AccntMains)
                .HasForeignKey(d => d.AccntCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntCategoryAccntMain");

            entity.HasOne(d => d.AccntType).WithMany(p => p.AccntMains)
                .HasForeignKey(d => d.AccntTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntTypeAccntMain");
        });

        modelBuilder.Entity<AccntTrxDtl>(entity =>
        {
            entity.HasIndex(e => e.AccntLedgerId, "IX_FK_AccntLedgerAccntTrxDtl");

            entity.HasIndex(e => e.AccntTrxHdrId, "IX_FK_AccntTrxHdrAccntTrxDtl");

            entity.Property(e => e.CrAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DbAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(50);

            entity.HasOne(d => d.AccntLedger).WithMany(p => p.AccntTrxDtls)
                .HasForeignKey(d => d.AccntLedgerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntLedgerAccntTrxDtl");

            entity.HasOne(d => d.AccntTrxHdr).WithMany(p => p.AccntTrxDtls)
                .HasForeignKey(d => d.AccntTrxHdrId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntTrxHdrAccntTrxDtl");
        });

        modelBuilder.Entity<AccntTrxHdr>(entity =>
        {
            entity.HasIndex(e => e.AccntTrxTypeId, "IX_FK_AccntTrxTypeAccntTrxHdr");

            entity.Property(e => e.DtTrx).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.AccntTrxType).WithMany(p => p.AccntTrxHdrs)
                .HasForeignKey(d => d.AccntTrxTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccntTrxTypeAccntTrxHdr");
        });

        modelBuilder.Entity<AccntTrxHist>(entity =>
        {
            entity.Property(e => e.HistType).HasMaxLength(20);
            entity.Property(e => e.OldData).HasMaxLength(250);
            entity.Property(e => e.User).HasMaxLength(80);
        });

        modelBuilder.Entity<AccntTrxType>(entity =>
        {
            entity.Property(e => e.Code).HasMaxLength(3);
            entity.Property(e => e.Remarks).HasMaxLength(30);
        });

        modelBuilder.Entity<AccntType>(entity =>
        {
            entity.Property(e => e.Code).HasMaxLength(5);
            entity.Property(e => e.NormalForm).HasMaxLength(2);
        });

        modelBuilder.Entity<AdminEmail>(entity =>
        {
            entity.Property(e => e.AccCode).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<ApAccStatus>(entity =>
        {
            entity.ToTable("ApAccStatus");

            entity.Property(e => e.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<ApAccount>(entity =>
        {
            entity.HasIndex(e => e.ApAccStatusId, "IX_FK_ApAccStatusApAccount");

            entity.Property(e => e.Address).HasMaxLength(180);
            entity.Property(e => e.ContactPerson).HasMaxLength(180);
            entity.Property(e => e.Email).HasMaxLength(80);
            entity.Property(e => e.Landline).HasMaxLength(20);
            entity.Property(e => e.Landline2).HasMaxLength(20);
            entity.Property(e => e.Mobile).HasMaxLength(20);
            entity.Property(e => e.Mobile2).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(180);
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.ApAccStatus).WithMany(p => p.ApAccounts)
                .HasForeignKey(d => d.ApAccStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApAccStatusApAccount");
        });

        modelBuilder.Entity<ApAction>(entity =>
        {
            entity.HasIndex(e => e.ApActionItemId, "IX_FK_ApActionItemApAction");

            entity.HasIndex(e => e.ApTransactionId, "IX_FK_ApTransactionApAction");

            entity.Property(e => e.DtPerformed).HasColumnType("datetime");
            entity.Property(e => e.PerformedBy).HasMaxLength(180);

            entity.HasOne(d => d.ApActionItem).WithMany(p => p.ApActions)
                .HasForeignKey(d => d.ApActionItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApActionItemApAction");

            entity.HasOne(d => d.ApTransaction).WithMany(p => p.ApActions)
                .HasForeignKey(d => d.ApTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransactionApAction");
        });

        modelBuilder.Entity<ApActionItem>(entity =>
        {
            entity.Property(e => e.Action).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(180);
        });

        modelBuilder.Entity<ApCashFlow>(entity =>
        {
            entity.HasIndex(e => e.ApAccountId, "IX_FK_ApAccountApCashFlow");

            entity.HasIndex(e => e.ApCashFlowTypeId, "IX_FK_ApCashFlowTypeApCashFlow");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.PerformedBy)
                .HasMaxLength(80)
                .HasDefaultValueSql("((0))");
            entity.Property(e => e.Remarks).HasMaxLength(180);

            entity.HasOne(d => d.ApAccount).WithMany(p => p.ApCashFlows)
                .HasForeignKey(d => d.ApAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApAccountApCashFlow");

            entity.HasOne(d => d.ApCashFlowType).WithMany(p => p.ApCashFlows)
                .HasForeignKey(d => d.ApCashFlowTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApCashFlowTypeApCashFlow");
        });

        modelBuilder.Entity<ApCashFlowPostGroup>(entity =>
        {
            entity.HasIndex(e => e.ApCashFlowId, "IX_FK_ApCashFlowApCashFlowPostGroup");

            entity.HasIndex(e => e.ApTransPostId, "IX_FK_ApTransPostApCashFlowPostGroup");

            entity.HasOne(d => d.ApCashFlow).WithMany(p => p.ApCashFlowPostGroups)
                .HasForeignKey(d => d.ApCashFlowId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApCashFlowApCashFlowPostGroup");

            entity.HasOne(d => d.ApTransPost).WithMany(p => p.ApCashFlowPostGroups)
                .HasForeignKey(d => d.ApTransPostId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransPostApCashFlowPostGroup");
        });

        modelBuilder.Entity<ApCashFlowType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(40);
        });

        modelBuilder.Entity<ApPayment>(entity =>
        {
            entity.HasIndex(e => e.ApAccountId, "IX_FK_ApAccountApPayments");

            entity.HasIndex(e => e.ApPaymentStatusId, "IX_FK_ApPaymentStatusApPayments");

            entity.HasIndex(e => e.ApPaymentTypeId, "IX_FK_ApPaymentTypeApPayments");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.DtPayment).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.ApAccount).WithMany(p => p.ApPayments)
                .HasForeignKey(d => d.ApAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApAccountApPayments");

            entity.HasOne(d => d.ApPaymentStatus).WithMany(p => p.ApPayments)
                .HasForeignKey(d => d.ApPaymentStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApPaymentStatusApPayments");

            entity.HasOne(d => d.ApPaymentType).WithMany(p => p.ApPayments)
                .HasForeignKey(d => d.ApPaymentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApPaymentTypeApPayments");
        });

        modelBuilder.Entity<ApPaymentStatus>(entity =>
        {
            entity.ToTable("ApPaymentStatus");
        });

        modelBuilder.Entity<ApPaymentType>(entity =>
        {
            entity.Property(e => e.Remarks).HasMaxLength(50);
            entity.Property(e => e.Type).HasMaxLength(20);
        });

        modelBuilder.Entity<ApPrintRequest>(entity =>
        {
            entity.Property(e => e.DtRequest).HasColumnType("datetime");
            entity.Property(e => e.RequestBy).HasMaxLength(80);
        });

        modelBuilder.Entity<ApTransCategory>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Remarks).HasMaxLength(180);
        });

        modelBuilder.Entity<ApTransItem>(entity =>
        {
            entity.HasIndex(e => e.ApTransactionId, "IX_FK_ApTransactionApTransItems");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ApTransaction).WithMany(p => p.ApTransItems)
                .HasForeignKey(d => d.ApTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransactionApTransItems");
        });

        modelBuilder.Entity<ApTransPayment>(entity =>
        {
            entity.HasIndex(e => e.ApPaymentsId, "IX_FK_ApPaymentsApTransPayment");

            entity.HasIndex(e => e.ApTransactionId, "IX_FK_ApTransactionApTransPayment");

            entity.HasOne(d => d.ApPayments).WithMany(p => p.ApTransPayments)
                .HasForeignKey(d => d.ApPaymentsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApPaymentsApTransPayment");

            entity.HasOne(d => d.ApTransaction).WithMany(p => p.ApTransPayments)
                .HasForeignKey(d => d.ApTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransactionApTransPayment");
        });

        modelBuilder.Entity<ApTransPost>(entity =>
        {
            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Balance).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Cash).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.DtPost).HasColumnType("datetime");
        });

        modelBuilder.Entity<ApTransPrintReq>(entity =>
        {
            entity.HasIndex(e => e.ApPrintRequestId, "IX_FK_ApTransPrintReqApPrintRequest");

            entity.HasIndex(e => e.ApTransactionId, "IX_FK_ApTransPrintReqApTransaction");

            entity.HasOne(d => d.ApPrintRequest).WithMany(p => p.ApTransPrintReqs)
                .HasForeignKey(d => d.ApPrintRequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransPrintReqApPrintRequest");

            entity.HasOne(d => d.ApTransaction).WithMany(p => p.ApTransPrintReqs)
                .HasForeignKey(d => d.ApTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransPrintReqApTransaction");
        });

        modelBuilder.Entity<ApTransRepeat>(entity =>
        {
            entity.HasIndex(e => e.ApTransactionId1, "IX_FK_ApTransactionApTransRepeat");

            entity.Property(e => e.ApTransactionId1).HasColumnName("ApTransaction_Id");

            entity.HasOne(d => d.ApTransactionId1Navigation).WithMany(p => p.ApTransRepeats)
                .HasForeignKey(d => d.ApTransactionId1)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransactionApTransRepeat");
        });

        modelBuilder.Entity<ApTransStatus>(entity =>
        {
            entity.ToTable("ApTransStatus");

            entity.Property(e => e.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<ApTransType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(40);
        });

        modelBuilder.Entity<ApTransaction>(entity =>
        {
            entity.HasIndex(e => e.ApAccountId, "IX_FK_ApAccountApTransaction");

            entity.HasIndex(e => e.ApTransCategoryId, "IX_FK_ApTransCategoryApTransaction");

            entity.HasIndex(e => e.ApTransStatusId, "IX_FK_ApTransStatusApTransaction");

            entity.HasIndex(e => e.ApTransTypeId, "IX_FK_ApTransTypeApTransaction");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.ApTransTypeId).HasDefaultValue(1);
            entity.Property(e => e.BudgetAmt).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.DtDue).HasColumnType("datetime");
            entity.Property(e => e.DtEncoded).HasColumnType("datetime");
            entity.Property(e => e.DtInvoice).HasColumnType("datetime");
            entity.Property(e => e.DtRelease).HasColumnType("datetime");
            entity.Property(e => e.DtService).HasColumnType("datetime");
            entity.Property(e => e.DtServiceTo).HasColumnType("datetime");
            entity.Property(e => e.ReleaseAmt).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Remarks).HasMaxLength(180);

            entity.HasOne(d => d.ApAccount).WithMany(p => p.ApTransactions)
                .HasForeignKey(d => d.ApAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApAccountApTransaction");

            entity.HasOne(d => d.ApTransCategory).WithMany(p => p.ApTransactions)
                .HasForeignKey(d => d.ApTransCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransCategoryApTransaction");

            entity.HasOne(d => d.ApTransStatus).WithMany(p => p.ApTransactions)
                .HasForeignKey(d => d.ApTransStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransStatusApTransaction");

            entity.HasOne(d => d.ApTransType).WithMany(p => p.ApTransactions)
                .HasForeignKey(d => d.ApTransTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApTransTypeApTransaction");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasIndex(e => e.AppointmentAcctTypeId, "IX_FK_AppointmentAcctTypeAppointment");

            entity.HasIndex(e => e.AppointmentRequestId, "IX_FK_AppointmentRequestAppointment");

            entity.HasIndex(e => e.AppointmentSlotId, "IX_FK_AppointmentSlotAppointment");

            entity.HasIndex(e => e.AppointmentStatusId, "IX_FK_AppointmentStatusAppointment");

            entity.Property(e => e.Contact).HasMaxLength(30);
            entity.Property(e => e.CustCode).HasMaxLength(10);
            entity.Property(e => e.Customer).HasMaxLength(60);
            entity.Property(e => e.DtEntered).HasColumnType("datetime");
            entity.Property(e => e.Unit)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.AppointmentAcctType).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.AppointmentAcctTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AppointmentAcctTypeAppointment");

            entity.HasOne(d => d.AppointmentRequest).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.AppointmentRequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AppointmentRequestAppointment");

            entity.HasOne(d => d.AppointmentSlot).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.AppointmentSlotId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AppointmentSlotAppointment");

            entity.HasOne(d => d.AppointmentStatus).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.AppointmentStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AppointmentStatusAppointment");
        });

        modelBuilder.Entity<AppointmentRequest>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
        });

        modelBuilder.Entity<AppointmentStatus>(entity =>
        {
            entity.ToTable("AppointmentStatus");

            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<ArAccContact>(entity =>
        {
            entity.HasIndex(e => e.ArAccountId, "IX_FK_ArAccountArAccContact");

            entity.Property(e => e.Email).HasMaxLength(80);
            entity.Property(e => e.Mobile).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Position).HasMaxLength(80);

            entity.HasOne(d => d.ArAccount).WithMany(p => p.ArAccContacts)
                .HasForeignKey(d => d.ArAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccountArAccContact");
        });

        modelBuilder.Entity<ArAccStatus>(entity =>
        {
            entity.ToTable("ArAccStatus");

            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<ArAccntCredit>(entity =>
        {
            entity.HasIndex(e => e.ArAccountId, "IX_FK_ArAccountArAccntCredit");

            entity.HasIndex(e => e.ArCreditStatusId, "IX_FK_ArCreditStatusArAccntCredit");

            entity.Property(e => e.ApprovedBy).HasMaxLength(80);
            entity.Property(e => e.CreditLimit).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CreditWarning).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtCredit).HasColumnType("datetime");
            entity.Property(e => e.OverLimitAllowed).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.ArAccount).WithMany(p => p.ArAccntCredits)
                .HasForeignKey(d => d.ArAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccountArAccntCredit");

            entity.HasOne(d => d.ArCreditStatus).WithMany(p => p.ArAccntCredits)
                .HasForeignKey(d => d.ArCreditStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArCreditStatusArAccntCredit");
        });

        modelBuilder.Entity<ArAccntTerm>(entity =>
        {
            entity.HasIndex(e => e.ArAccntTermStatusId, "IX_FK_ArAccntTermStatusArAccntPaymentTerm");

            entity.HasIndex(e => e.ArAccountId, "IX_FK_ArAccountArAccntPaymentTerm");

            entity.Property(e => e.DtTerm)
                .HasColumnType("datetime")
                .HasColumnName("dtTerm");
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.ArAccntTermStatus).WithMany(p => p.ArAccntTerms)
                .HasForeignKey(d => d.ArAccntTermStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccntTermStatusArAccntPaymentTerm");

            entity.HasOne(d => d.ArAccount).WithMany(p => p.ArAccntTerms)
                .HasForeignKey(d => d.ArAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccountArAccntPaymentTerm");
        });

        modelBuilder.Entity<ArAccntTermStatus>(entity =>
        {
            entity.ToTable("ArAccntTermStatus");

            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<ArAccount>(entity =>
        {
            entity.HasIndex(e => e.ArAccStatusId, "IX_FK_ArAccStatusArAccount");

            entity.Property(e => e.Address).HasMaxLength(120);
            entity.Property(e => e.Company).HasMaxLength(80);
            entity.Property(e => e.Email).HasMaxLength(80);
            entity.Property(e => e.Landline).HasMaxLength(40);
            entity.Property(e => e.Landline2).HasMaxLength(20);
            entity.Property(e => e.Mobile).HasMaxLength(40);
            entity.Property(e => e.Mobile2).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ArAccStatus).WithMany(p => p.ArAccounts)
                .HasForeignKey(d => d.ArAccStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccStatusArAccount");
        });

        modelBuilder.Entity<ArAction>(entity =>
        {
            entity.HasIndex(e => e.ArActionItemId, "IX_FK_ArActionItemArAction");

            entity.HasIndex(e => e.ArTransactionId, "IX_FK_ArTransactionArAction");

            entity.Property(e => e.DtPerformed).HasColumnType("datetime");
            entity.Property(e => e.PreformedBy).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ArActionItem).WithMany(p => p.ArActions)
                .HasForeignKey(d => d.ArActionItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArActionItemArAction");

            entity.HasOne(d => d.ArTransaction).WithMany(p => p.ArActions)
                .HasForeignKey(d => d.ArTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransactionArAction");
        });

        modelBuilder.Entity<ArActionItem>(entity =>
        {
            entity.Property(e => e.Action).HasMaxLength(40);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.SortNo).HasColumnType("decimal(18, 0)");
        });

        modelBuilder.Entity<ArCategory>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<ArCreditStatus>(entity =>
        {
            entity.ToTable("ArCreditStatus");

            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<ArDeposit>(entity =>
        {
            entity.HasIndex(e => e.ArDepositBankId, "IX_FK_ArDepositBankArDeposit");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ArDepositBankId).HasDefaultValue(1);
            entity.Property(e => e.DtDeposit).HasColumnType("datetime");
            entity.Property(e => e.Reference).HasMaxLength(20);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ArDepositBank).WithMany(p => p.ArDeposits)
                .HasForeignKey(d => d.ArDepositBankId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArDepositBankArDeposit");
        });

        modelBuilder.Entity<ArPayment>(entity =>
        {
            entity.HasIndex(e => e.ArAccountId, "IX_FK_ArAccountArPayment");

            entity.HasIndex(e => e.ArPaymentTypeId, "IX_FK_ArPaymentTypeArPayment");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.DtDeposit).HasColumnType("datetime");
            entity.Property(e => e.DtPayment).HasColumnType("datetime");
            entity.Property(e => e.Reference).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ArAccount).WithMany(p => p.ArPayments)
                .HasForeignKey(d => d.ArAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccountArPayment");

            entity.HasOne(d => d.ArPaymentType).WithMany(p => p.ArPayments)
                .HasForeignKey(d => d.ArPaymentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArPaymentTypeArPayment");
        });

        modelBuilder.Entity<ArPaymentType>(entity =>
        {
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Type).HasMaxLength(40);
        });

        modelBuilder.Entity<ArTransDeposit>(entity =>
        {
            entity.HasIndex(e => e.ArDepositId, "IX_FK_ArDepositArTransDeposit");

            entity.HasIndex(e => e.ArTransactionId, "IX_FK_ArTransactionArTransDeposit");

            entity.HasOne(d => d.ArDeposit).WithMany(p => p.ArTransDeposits)
                .HasForeignKey(d => d.ArDepositId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArDepositArTransDeposit");

            entity.HasOne(d => d.ArTransaction).WithMany(p => p.ArTransDeposits)
                .HasForeignKey(d => d.ArTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransactionArTransDeposit");
        });

        modelBuilder.Entity<ArTransPayment>(entity =>
        {
            entity.HasIndex(e => e.ArPaymentId, "IX_FK_ArPaymentArTransPayment");

            entity.HasIndex(e => e.ArTransactionId, "IX_FK_ArTransactionArTransPayment");

            entity.HasOne(d => d.ArPayment).WithMany(p => p.ArTransPayments)
                .HasForeignKey(d => d.ArPaymentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArPaymentArTransPayment");

            entity.HasOne(d => d.ArTransaction).WithMany(p => p.ArTransPayments)
                .HasForeignKey(d => d.ArTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransactionArTransPayment");
        });

        modelBuilder.Entity<ArTransPost>(entity =>
        {
            entity.HasIndex(e => e.ArTransactionId, "IX_FK_ArTransactionArTransPost");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.Balance).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.DtPost).HasColumnType("datetime");

            entity.HasOne(d => d.ArTransaction).WithMany(p => p.ArTransPosts)
                .HasForeignKey(d => d.ArTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransactionArTransPost");
        });

        modelBuilder.Entity<ArTransRepeat>(entity =>
        {
            entity.HasIndex(e => e.ArTransactionId, "IX_FK_ArTransactionArTransRepeat");

            entity.Property(e => e.ArTransactionId).HasColumnName("ArTransaction_Id");

            entity.HasOne(d => d.ArTransaction).WithMany(p => p.ArTransRepeats)
                .HasForeignKey(d => d.ArTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransactionArTransRepeat");
        });

        modelBuilder.Entity<ArTransStatus>(entity =>
        {
            entity.ToTable("ArTransStatus");
        });

        modelBuilder.Entity<ArTransaction>(entity =>
        {
            entity.HasIndex(e => e.ArAccountId, "IX_FK_ArAccountArTransaction");

            entity.HasIndex(e => e.ArCategoryId, "IX_FK_ArCategoryArTransaction");

            entity.HasIndex(e => e.ArTransStatusId, "IX_FK_ArTransStatusArTransaction");

            entity.Property(e => e.Amount).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.ArAccContactId).HasDefaultValue(1);
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.DtDue).HasColumnType("datetime");
            entity.Property(e => e.DtEncoded).HasColumnType("datetime");
            entity.Property(e => e.DtInvoice).HasColumnType("datetime");
            entity.Property(e => e.DtService).HasColumnType("datetime");
            entity.Property(e => e.DtServiceTo).HasColumnType("datetime");
            entity.Property(e => e.InvoiceRef).HasMaxLength(20);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ArAccount).WithMany(p => p.ArTransactions)
                .HasForeignKey(d => d.ArAccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArAccountArTransaction");

            entity.HasOne(d => d.ArCategory).WithMany(p => p.ArTransactions)
                .HasForeignKey(d => d.ArCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArCategoryArTransaction");

            entity.HasOne(d => d.ArTransStatus).WithMany(p => p.ArTransactions)
                .HasForeignKey(d => d.ArTransStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArTransStatusArTransaction");
        });

        modelBuilder.Entity<AsCostCenter>(entity =>
        {
            entity.Property(e => e.CcName)
                .HasMaxLength(80)
                .HasColumnName("ccName");
            entity.Property(e => e.XxRemarks)
                .HasMaxLength(250)
                .HasColumnName("xxRemarks");
        });

        modelBuilder.Entity<AsExpBiller>(entity =>
        {
            entity.Property(e => e.Address).HasMaxLength(80);
            entity.Property(e => e.Contact).HasMaxLength(80);
            entity.Property(e => e.Contact2).HasMaxLength(80);
            entity.Property(e => e.FullName).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.ShortName).HasMaxLength(50);
        });

        modelBuilder.Entity<AsExpCategory>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<AsExpense>(entity =>
        {
            entity.HasIndex(e => e.AsCostCenterId, "IX_FK_AsCostCenterAsExpense");

            entity.HasIndex(e => e.AsExpBillerId, "IX_FK_AsExpBillerAsExpense");

            entity.HasIndex(e => e.AsExpCategoryId, "IX_FK_AsExpCategoryAsExpense");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DateEntered).HasColumnType("datetime");
            entity.Property(e => e.TrxDate).HasColumnType("datetime");
            entity.Property(e => e.TrxDesc).HasMaxLength(80);
            entity.Property(e => e.TrxRemarks).HasMaxLength(250);

            entity.HasOne(d => d.AsCostCenter).WithMany(p => p.AsExpenses)
                .HasForeignKey(d => d.AsCostCenterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsCostCenterAsExpense");

            entity.HasOne(d => d.AsExpBiller).WithMany(p => p.AsExpenses)
                .HasForeignKey(d => d.AsExpBillerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsExpBillerAsExpense");

            entity.HasOne(d => d.AsExpCategory).WithMany(p => p.AsExpenses)
                .HasForeignKey(d => d.AsExpCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsExpCategoryAsExpense");
        });

        modelBuilder.Entity<AsIncCategory>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<AsIncClient>(entity =>
        {
            entity.Property(e => e.Address).HasMaxLength(250);
            entity.Property(e => e.Company).HasMaxLength(80);
            entity.Property(e => e.Contact1).HasMaxLength(80);
            entity.Property(e => e.Contact2).HasMaxLength(80);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.ShortName).HasMaxLength(50);
        });

        modelBuilder.Entity<AsSale>(entity =>
        {
            entity.HasIndex(e => e.AsCostCenterId, "IX_FK_AsCostCenterAsSales");

            entity.HasIndex(e => e.AsIncCategoryId, "IX_FK_AsIncCategoryAsSales");

            entity.HasIndex(e => e.AsIncClientId, "IX_FK_AsIncClientAsSales");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DateEntered).HasColumnType("datetime");
            entity.Property(e => e.OrRef).HasMaxLength(20);
            entity.Property(e => e.TrxDate).HasColumnType("datetime");
            entity.Property(e => e.TrxDesc).HasMaxLength(80);

            entity.HasOne(d => d.AsCostCenter).WithMany(p => p.AsSales)
                .HasForeignKey(d => d.AsCostCenterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsCostCenterAsSales");

            entity.HasOne(d => d.AsIncCategory).WithMany(p => p.AsSales)
                .HasForeignKey(d => d.AsIncCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsIncCategoryAsSales");

            entity.HasOne(d => d.AsIncClient).WithMany(p => p.AsSales)
                .HasForeignKey(d => d.AsIncClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsIncClientAsSales");
        });

        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.AspNetRoles");

            entity.HasIndex(e => e.Name, "RoleNameIndex").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(128);
            entity.Property(e => e.Name).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.AspNetUsers");

            entity.HasIndex(e => e.UserName, "UserNameIndex").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(128);
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.LockoutEndDateUtc).HasColumnType("datetime");
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PK_dbo.AspNetUserRoles");
                        j.ToTable("AspNetUserRoles");
                        j.HasIndex(new[] { "RoleId" }, "IX_RoleId");
                        j.HasIndex(new[] { "UserId" }, "IX_UserId");
                        j.IndexerProperty<string>("UserId").HasMaxLength(128);
                        j.IndexerProperty<string>("RoleId").HasMaxLength(128);
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.AspNetUserClaims");

            entity.HasIndex(e => e.UserId, "IX_UserId");

            entity.Property(e => e.UserId).HasMaxLength(128);

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId");
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey, e.UserId }).HasName("PK_dbo.AspNetUserLogins");

            entity.HasIndex(e => e.UserId, "IX_UserId");

            entity.Property(e => e.LoginProvider).HasMaxLength(128);
            entity.Property(e => e.ProviderKey).HasMaxLength(128);
            entity.Property(e => e.UserId).HasMaxLength(128);

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId");
        });

        modelBuilder.Entity<BlasterLog>(entity =>
        {
            entity.HasIndex(e => e.EmailBlasterLogsId, "IX_FK_EmailBlasterLogsBlasterLog");

            entity.HasIndex(e => e.EmailBlasterTemplateId, "IX_FK_EmailBlasterTemplateBlasterLog");

            entity.HasOne(d => d.EmailBlasterLogs).WithMany(p => p.BlasterLogs)
                .HasForeignKey(d => d.EmailBlasterLogsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailBlasterLogsBlasterLog");

            entity.HasOne(d => d.EmailBlasterTemplate).WithMany(p => p.BlasterLogs)
                .HasForeignKey(d => d.EmailBlasterTemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailBlasterTemplateBlasterLog");
        });

        modelBuilder.Entity<Branch>(entity =>
        {
            entity.HasIndex(e => e.CityId, "IX_FK_CityBranch");

            entity.Property(e => e.Address).HasMaxLength(180);
            entity.Property(e => e.Landline).HasMaxLength(20);
            entity.Property(e => e.Mobile).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.City).WithMany(p => p.Branches)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityBranch");
        });

        modelBuilder.Entity<CarDestination>(entity =>
        {
            entity.HasIndex(e => e.CityId, "IX_FK_CityCarDestination");

            entity.HasOne(d => d.City).WithMany(p => p.CarDestinations)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityCarDestination");
        });

        modelBuilder.Entity<CarDetail>(entity =>
        {
            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarDetailCarUnit");

            entity.Property(e => e.Class).HasMaxLength(20);
            entity.Property(e => e.Fuel).HasMaxLength(30);
            entity.Property(e => e.Passengers).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(50);
            entity.Property(e => e.Transmission).HasMaxLength(40);
            entity.Property(e => e.Usage).HasMaxLength(30);

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarDetails)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarDetailCarUnit");
        });

        modelBuilder.Entity<CarImage>(entity =>
        {
            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarImage");

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarImages)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarImage");
        });

        modelBuilder.Entity<CarRate>(entity =>
        {
            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarRate");

            entity.Property(e => e.Daily).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Monthly).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.OtRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Weekly).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarRates)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarRate");
        });

        modelBuilder.Entity<CarRateGroup>(entity =>
        {
            entity.HasIndex(e => e.CarRatePackageId, "IX_FK_CarRatePackageCarRateGroup");

            entity.HasIndex(e => e.RateGroupId, "IX_FK_RateGroupCarRateGroup");

            entity.HasOne(d => d.CarRatePackage).WithMany(p => p.CarRateGroups)
                .HasForeignKey(d => d.CarRatePackageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarRatePackageCarRateGroup");

            entity.HasOne(d => d.RateGroup).WithMany(p => p.CarRateGroups)
                .HasForeignKey(d => d.RateGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RateGroupCarRateGroup");
        });

        modelBuilder.Entity<CarRatePackage>(entity =>
        {
            entity.Property(e => e.DailyMeals).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DailyRoom).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<CarRateUnitPackage>(entity =>
        {
            entity.HasIndex(e => e.CarRatePackageId, "IX_FK_CarRatePackageCarRateUnitPackage");

            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarRateUnitPackage");

            entity.Property(e => e.DailyAddon).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DailyRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.FuelDaily).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.FuelLonghaul).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.CarRatePackage).WithMany(p => p.CarRateUnitPackages)
                .HasForeignKey(d => d.CarRatePackageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarRatePackageCarRateUnitPackage");

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarRateUnitPackages)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarRateUnitPackage");
        });

        modelBuilder.Entity<CarResPackage>(entity =>
        {
            entity.HasIndex(e => e.CarRateUnitPackageId, "IX_FK_CarRateUnitPackageCarResPackage");

            entity.HasIndex(e => e.CarReservationId, "IX_FK_CarReservationCarResPackage");

            entity.HasOne(d => d.CarRateUnitPackage).WithMany(p => p.CarResPackages)
                .HasForeignKey(d => d.CarRateUnitPackageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarRateUnitPackageCarResPackage");

            entity.HasOne(d => d.CarReservation).WithMany(p => p.CarResPackages)
                .HasForeignKey(d => d.CarReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarReservationCarResPackage");
        });

        modelBuilder.Entity<CarResType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(20);
        });

        modelBuilder.Entity<CarReservation>(entity =>
        {
            entity.HasIndex(e => e.CarResTypeId, "IX_FK_CarResTypeCarReservation");

            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarReservation");

            entity.Property(e => e.CarResTypeId).HasDefaultValue(1);
            entity.Property(e => e.DtTrx).HasColumnType("datetime");
            entity.Property(e => e.NoDays).HasMaxLength(10);

            entity.HasOne(d => d.CarResType).WithMany(p => p.CarReservations)
                .HasForeignKey(d => d.CarResTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarResTypeCarReservation");

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarReservations)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarReservation");
        });

        modelBuilder.Entity<CarUnit>(entity =>
        {
            entity.HasIndex(e => e.CarCategoryId, "IX_FK_CarCategoryCarUnit");

            entity.Property(e => e.Status).HasMaxLength(10);

            entity.HasOne(d => d.CarCategory).WithMany(p => p.CarUnits)
                .HasForeignKey(d => d.CarCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarCategoryCarUnit");
        });

        modelBuilder.Entity<CarUnitMeta>(entity =>
        {
            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarUnitMeta");

            entity.Property(e => e.HomeDesc).HasMaxLength(300);
            entity.Property(e => e.MetaDesc).HasMaxLength(300);
            entity.Property(e => e.PageTitle).HasMaxLength(120);

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarUnitMeta)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarUnitMeta");
        });

        modelBuilder.Entity<CarViewPage>(entity =>
        {
            entity.HasIndex(e => e.CarUnitId, "IX_FK_CarUnitCarViewPage");

            entity.Property(e => e.Viewname).HasMaxLength(80);

            entity.HasOne(d => d.CarUnit).WithMany(p => p.CarViewPages)
                .HasForeignKey(d => d.CarUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarUnitCarViewPage");
        });

        modelBuilder.Entity<CashExpense>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_CashExpenseJobMain");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtExpense).HasColumnType("datetime");
            entity.Property(e => e.RecievedBy).HasMaxLength(30);
            entity.Property(e => e.ReleasedBy).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.JobMain).WithMany(p => p.CashExpenses)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CashExpenseJobMain");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<CoopMember>(entity =>
        {
            entity.Property(e => e.Contact1).HasMaxLength(20);
            entity.Property(e => e.Contact2).HasMaxLength(20);
            entity.Property(e => e.Contact3).HasMaxLength(20);
            entity.Property(e => e.Details).HasMaxLength(80);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<CoopMemberItem>(entity =>
        {
            entity.HasIndex(e => e.CoopMemberId, "IX_FK_CoopMemberCoopMemberItem");

            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemCoopMemberItem");

            entity.HasOne(d => d.CoopMember).WithMany(p => p.CoopMemberItems)
                .HasForeignKey(d => d.CoopMemberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CoopMemberCoopMemberItem");

            entity.HasOne(d => d.InvItem).WithMany(p => p.CoopMemberItems)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemCoopMemberItem");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.Property(e => e.Code).HasMaxLength(4);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<CrCashReqStatus>(entity =>
        {
            entity.ToTable("crCashReqStatus");
        });

        modelBuilder.Entity<CrLogCashGroup>(entity =>
        {
            entity.ToTable("crLogCashGroups");

            entity.HasIndex(e => e.CrLogCashSalaryId, "IX_FK_crLogCashGroupcrLogCashSalary");

            entity.HasIndex(e => e.CrLogCashReleaseId, "IX_FK_crLogCashReleasecrLogCashGroup");

            entity.Property(e => e.CrLogCashReleaseId).HasColumnName("crLogCashReleaseId");
            entity.Property(e => e.CrLogCashSalaryId).HasColumnName("crLogCashSalaryId");

            entity.HasOne(d => d.CrLogCashRelease).WithMany(p => p.CrLogCashGroups)
                .HasForeignKey(d => d.CrLogCashReleaseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogCashReleasecrLogCashGroup");

            entity.HasOne(d => d.CrLogCashSalary).WithMany(p => p.CrLogCashGroups)
                .HasForeignKey(d => d.CrLogCashSalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogCashGroupcrLogCashSalary");
        });

        modelBuilder.Entity<CrLogCashRelease>(entity =>
        {
            entity.ToTable("crLogCashReleases");

            entity.HasIndex(e => e.CrLogCashTypeId, "FK_crLogCashTypecrLogCashRelease");

            entity.HasIndex(e => e.CrLogClosingId, "IX_FK_crLogClosingcrLogCashRelease");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogCashRelease");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CrLogCashTypeId)
                .HasDefaultValue(1)
                .HasColumnName("crLogCashTypeId");
            entity.Property(e => e.CrLogClosingId).HasColumnName("crLogClosingId");
            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.DtRelease).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(60);

            entity.HasOne(d => d.CrLogCashType).WithMany(p => p.CrLogCashReleases)
                .HasForeignKey(d => d.CrLogCashTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("IX_FK_crLogCashTypecrLogCashRelease");

            entity.HasOne(d => d.CrLogClosing).WithMany(p => p.CrLogCashReleases)
                .HasForeignKey(d => d.CrLogClosingId)
                .HasConstraintName("FK_crLogClosingcrLogCashRelease");

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogCashReleases)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogCashRelease");
        });

        modelBuilder.Entity<CrLogCashSalary>(entity =>
        {
            entity.ToTable("crLogCashSalaries");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogCashSalary");

            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.ExcludeOt).HasColumnName("ExcludeOT");

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogCashSalaries)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogCashSalary");
        });

        modelBuilder.Entity<CrLogCashStatus>(entity =>
        {
            entity.ToTable("crLogCashStatus");

            entity.HasIndex(e => e.CrCashReqStatusId, "IX_FK_crCashReqStatuscrLogCashStatus");

            entity.HasIndex(e => e.CrLogCashReleaseId, "IX_FK_crLogCashReleasecrLogCashStatus");

            entity.Property(e => e.CrCashReqStatusId).HasColumnName("crCashReqStatusId");
            entity.Property(e => e.CrLogCashReleaseId).HasColumnName("crLogCashReleaseId");
            entity.Property(e => e.DtStatus)
                .HasColumnType("datetime")
                .HasColumnName("dtStatus");

            entity.HasOne(d => d.CrCashReqStatus).WithMany(p => p.CrLogCashStatuses)
                .HasForeignKey(d => d.CrCashReqStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crCashReqStatuscrLogCashStatus");

            entity.HasOne(d => d.CrLogCashRelease).WithMany(p => p.CrLogCashStatuses)
                .HasForeignKey(d => d.CrLogCashReleaseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogCashReleasecrLogCashStatus");
        });

        modelBuilder.Entity<CrLogCashType>(entity =>
        {
            entity.ToTable("crLogCashTypes");

            entity.Property(e => e.Code).HasMaxLength(10);
            entity.Property(e => e.Description).HasMaxLength(30);
        });

        modelBuilder.Entity<CrLogClosing>(entity =>
        {
            entity.ToTable("crLogClosings");

            entity.Property(e => e.DtClose)
                .HasColumnType("datetime")
                .HasColumnName("dtClose");
        });

        modelBuilder.Entity<CrLogCompany>(entity =>
        {
            entity.ToTable("crLogCompanies");

            entity.Property(e => e.BillingAddress)
                .HasMaxLength(180)
                .IsUnicode(false);
            entity.Property(e => e.BillingName)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.BillingRemarks).HasMaxLength(180);
            entity.Property(e => e.BillingStyle)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.BillingTin)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("BillingTIN");
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CrLogCompanyRate>(entity =>
        {
            entity.ToTable("crLogCompanyRates");

            entity.HasIndex(e => e.CrLogCompanyId, "IX_FK_crLogCompanycrLogCompanyRate");

            entity.Property(e => e.CrLogCompanyId).HasColumnName("crLogCompanyId");
            entity.Property(e => e.DriverDailyRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DriverOtrate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("DriverOTRate");
            entity.Property(e => e.Otrate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("OTRate");
            entity.Property(e => e.TripRate).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.CrLogCompany).WithMany(p => p.CrLogCompanyRates)
                .HasForeignKey(d => d.CrLogCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogCompanycrLogCompanyRate");
        });

        modelBuilder.Entity<CrLogDriver>(entity =>
        {
            entity.ToTable("crLogDrivers");

            entity.Property(e => e.Contact1).HasMaxLength(20);
            entity.Property(e => e.Contact2).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Status).HasMaxLength(3);
        });

        modelBuilder.Entity<CrLogDriverPayment>(entity =>
        {
            entity.ToTable("crLogDriverPayments");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogDriverPayment");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<CrLogDriverTerm>(entity =>
        {
            entity.ToTable("crLogDriverTerms");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogDriverTerm");

            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(180);

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogDriverTerms)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogDriverTerm");
        });

        modelBuilder.Entity<CrLogFuel>(entity =>
        {
            entity.ToTable("crLogFuels");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogFuel");

            entity.HasIndex(e => e.CrLogPaymentTypeId, "IX_FK_crLogPaymentTypecrLogFuel");

            entity.HasIndex(e => e.CrLogTypeId, "IX_FK_crLogTypecrLogFuel");

            entity.HasIndex(e => e.CrLogUnitId, "IX_FK_crLogUnitcrLogFuel");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.CrLogPaymentTypeId)
                .HasDefaultValue(5)
                .HasColumnName("crLogPaymentTypeId");
            entity.Property(e => e.CrLogTypeId).HasColumnName("crLogTypeId");
            entity.Property(e => e.CrLogUnitId).HasColumnName("crLogUnitId");
            entity.Property(e => e.DtFillup)
                .HasColumnType("datetime")
                .HasColumnName("dtFillup");
            entity.Property(e => e.DtRequest)
                .HasColumnType("datetime")
                .HasColumnName("dtRequest");
            entity.Property(e => e.IsFullTank).HasColumnName("isFullTank");
            entity.Property(e => e.OdoEnd).HasColumnName("odoEnd");
            entity.Property(e => e.OdoFillup).HasColumnName("odoFillup");
            entity.Property(e => e.OdoStart).HasColumnName("odoStart");
            entity.Property(e => e.OrAmount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("orAmount");
            entity.Property(e => e.Remarks).HasMaxLength(50);

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogFuels)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogFuel");

            entity.HasOne(d => d.CrLogPaymentType).WithMany(p => p.CrLogFuels)
                .HasForeignKey(d => d.CrLogPaymentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogPaymentTypecrLogFuel");

            entity.HasOne(d => d.CrLogType).WithMany(p => p.CrLogFuels)
                .HasForeignKey(d => d.CrLogTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogTypecrLogFuel");

            entity.HasOne(d => d.CrLogUnit).WithMany(p => p.CrLogFuels)
                .HasForeignKey(d => d.CrLogUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogUnitcrLogFuel");
        });

        modelBuilder.Entity<CrLogFuelStatus>(entity =>
        {
            entity.ToTable("crLogFuelStatus");

            entity.HasIndex(e => e.CrCashReqStatusId, "IX_FK_crCashReqStatuscrLogFuelStatus");

            entity.HasIndex(e => e.CrLogFuelId, "IX_FK_crLogFuelcrLogFuelStatus");

            entity.Property(e => e.CrCashReqStatusId).HasColumnName("crCashReqStatusId");
            entity.Property(e => e.CrLogFuelId).HasColumnName("crLogFuelId");
            entity.Property(e => e.DtStatus)
                .HasColumnType("datetime")
                .HasColumnName("dtStatus");

            entity.HasOne(d => d.CrCashReqStatus).WithMany(p => p.CrLogFuelStatuses)
                .HasForeignKey(d => d.CrCashReqStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crCashReqStatuscrLogFuelStatus");

            entity.HasOne(d => d.CrLogFuel).WithMany(p => p.CrLogFuelStatuses)
                .HasForeignKey(d => d.CrLogFuelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogFuelcrLogFuelStatus");
        });

        modelBuilder.Entity<CrLogOdo>(entity =>
        {
            entity.ToTable("crLogOdoes");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogOdo");

            entity.HasIndex(e => e.CrLogUnitId, "IX_FK_crLogUnitcrLogOdo");

            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.CrLogUnitId).HasColumnName("crLogUnitId");
            entity.Property(e => e.DtReading)
                .HasColumnType("datetime")
                .HasColumnName("dtReading");

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogOdos)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogOdo");

            entity.HasOne(d => d.CrLogUnit).WithMany(p => p.CrLogOdos)
                .HasForeignKey(d => d.CrLogUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogUnitcrLogOdo");
        });

        modelBuilder.Entity<CrLogOwner>(entity =>
        {
            entity.ToTable("crLogOwners");

            entity.Property(e => e.Mobile).HasMaxLength(30);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<CrLogPassRemark>(entity =>
        {
            entity.ToTable("crLogPassRemarks");

            entity.Property(e => e.Description).HasMaxLength(80);
        });

        modelBuilder.Entity<CrLogPassStatus>(entity =>
        {
            entity.ToTable("crLogPassStatus");

            entity.Property(e => e.Status).HasMaxLength(30);
        });

        modelBuilder.Entity<CrLogPassenger>(entity =>
        {
            entity.ToTable("crLogPassengers");

            entity.HasIndex(e => e.CrLogPassStatusId, "IX_FK_crLogPassStatuscrLogPassenger");

            entity.HasIndex(e => e.CrLogTripId, "IX_FK_crLogTripcrLogPassenger");

            entity.Property(e => e.Area).HasMaxLength(150);
            entity.Property(e => e.Contact).HasMaxLength(50);
            entity.Property(e => e.CrLogPassStatusId).HasColumnName("crLogPassStatusId");
            entity.Property(e => e.CrLogTripId).HasColumnName("crLogTripId");
            entity.Property(e => e.DropPoint).HasMaxLength(150);
            entity.Property(e => e.DropTime).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.PassAddress).HasMaxLength(180);
            entity.Property(e => e.PickupPoint).HasMaxLength(150);
            entity.Property(e => e.PickupTime).HasMaxLength(10);
            entity.Property(e => e.Remarks).HasMaxLength(150);
            entity.Property(e => e.RestDay)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.TimeBoarded)
                .HasMaxLength(10)
                .HasColumnName("timeBoarded");
            entity.Property(e => e.TimeContacted)
                .HasMaxLength(10)
                .HasColumnName("timeContacted");
            entity.Property(e => e.TimeDelivered)
                .HasMaxLength(10)
                .HasColumnName("timeDelivered");

            entity.HasOne(d => d.CrLogPassStatus).WithMany(p => p.CrLogPassengers)
                .HasForeignKey(d => d.CrLogPassStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogPassStatuscrLogPassenger");

            entity.HasOne(d => d.CrLogTrip).WithMany(p => p.CrLogPassengers)
                .HasForeignKey(d => d.CrLogTripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogTripcrLogPassenger");
        });

        modelBuilder.Entity<CrLogPassengerArea>(entity =>
        {
            entity.ToTable("crLogPassengerAreas");

            entity.Property(e => e.Name).HasMaxLength(150);
        });

        modelBuilder.Entity<CrLogPassengerMaster>(entity =>
        {
            entity.ToTable("crLogPassengerMasters");

            entity.Property(e => e.Area).HasMaxLength(150);
            entity.Property(e => e.Contact).HasMaxLength(50);
            entity.Property(e => e.DropPoint).HasMaxLength(150);
            entity.Property(e => e.DropTime).HasMaxLength(150);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.PassAddress).HasMaxLength(150);
            entity.Property(e => e.PickupPoint).HasMaxLength(150);
            entity.Property(e => e.PickupTime).HasMaxLength(150);
            entity.Property(e => e.Remarks).HasMaxLength(150);
            entity.Property(e => e.RestDays).HasMaxLength(150);
        });

        modelBuilder.Entity<CrLogPaymentType>(entity =>
        {
            entity.ToTable("crLogPaymentTypes");
        });

        modelBuilder.Entity<CrLogTrip>(entity =>
        {
            entity.ToTable("crLogTrips");

            entity.HasIndex(e => e.CrLogClosingId, "IX_FK_crLogClosingcrLogTrip");

            entity.HasIndex(e => e.CrLogCompanyId, "IX_FK_crLogCompanycrLogTrip");

            entity.HasIndex(e => e.CrLogDriverId, "IX_FK_crLogDrivercrLogTrip");

            entity.HasIndex(e => e.CrLogUnitId, "IX_FK_crLogUnitcrLogTrip");

            entity.Property(e => e.Addon).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.AddonOt)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("AddonOT");
            entity.Property(e => e.CrLogClosingId).HasColumnName("crLogClosingId");
            entity.Property(e => e.CrLogCompanyId).HasColumnName("crLogCompanyId");
            entity.Property(e => e.CrLogDriverId).HasColumnName("crLogDriverId");
            entity.Property(e => e.CrLogUnitId).HasColumnName("crLogUnitId");
            entity.Property(e => e.DriverFee).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.DriverOt)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("DriverOT");
            entity.Property(e => e.DriverOtrate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("DriverOTRate");
            entity.Property(e => e.DtTrip).HasColumnType("datetime");
            entity.Property(e => e.EndTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Expenses).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.IncludeOt).HasColumnName("IncludeOT");
            entity.Property(e => e.Otrate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("OTRate");
            entity.Property(e => e.Rate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(50);
            entity.Property(e => e.StartTime)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CrLogClosing).WithMany(p => p.CrLogTrips)
                .HasForeignKey(d => d.CrLogClosingId)
                .HasConstraintName("FK_crLogClosingcrLogTrip");

            entity.HasOne(d => d.CrLogCompany).WithMany(p => p.CrLogTrips)
                .HasForeignKey(d => d.CrLogCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogCompanycrLogTrip");

            entity.HasOne(d => d.CrLogDriver).WithMany(p => p.CrLogTrips)
                .HasForeignKey(d => d.CrLogDriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogDrivercrLogTrip");

            entity.HasOne(d => d.CrLogUnit).WithMany(p => p.CrLogTrips)
                .HasForeignKey(d => d.CrLogUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogUnitcrLogTrip");
        });

        modelBuilder.Entity<CrLogTripJobMain>(entity =>
        {
            entity.ToTable("crLogTripJobMains");

            entity.HasIndex(e => e.CrLogTripId, "IX_FK_crLogTripcrLogTripJobMain");

            entity.Property(e => e.CrLogTripId).HasColumnName("crLogTripId");

            entity.HasOne(d => d.CrLogTrip).WithMany(p => p.CrLogTripJobMains)
                .HasForeignKey(d => d.CrLogTripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogTripcrLogTripJobMain");
        });

        modelBuilder.Entity<CrLogType>(entity =>
        {
            entity.ToTable("crLogTypes");
        });

        modelBuilder.Entity<CrLogUnit>(entity =>
        {
            entity.ToTable("crLogUnits");

            entity.HasIndex(e => e.CrLogOwnerId, "IX_FK_crLogOwnercrLogUnit");

            entity.Property(e => e.CrLogOwnerId)
                .HasDefaultValue(1)
                .HasColumnName("crLogOwnerId");
            entity.Property(e => e.Description).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Status).HasMaxLength(3);

            entity.HasOne(d => d.CrLogOwner).WithMany(p => p.CrLogUnits)
                .HasForeignKey(d => d.CrLogOwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogOwnercrLogUnit");
        });

        modelBuilder.Entity<CrRptUnit>(entity =>
        {
            entity.HasIndex(e => e.CrLogUnitId, "IX_FK_crLogUnitCrRptUnit");

            entity.HasIndex(e => e.CrRptUnitExpenseId, "IX_FK_crRptUnitExpenseCrRptUnit");

            entity.Property(e => e.CrLogUnitId).HasColumnName("crLogUnitId");
            entity.Property(e => e.CrRptUnitExpenseId).HasColumnName("crRptUnitExpenseId");

            entity.HasOne(d => d.CrLogUnit).WithMany(p => p.CrRptUnits)
                .HasForeignKey(d => d.CrLogUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crLogUnitCrRptUnit");

            entity.HasOne(d => d.CrRptUnitExpense).WithMany(p => p.CrRptUnits)
                .HasForeignKey(d => d.CrRptUnitExpenseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_crRptUnitExpenseCrRptUnit");
        });

        modelBuilder.Entity<CrRptUnitExpense>(entity =>
        {
            entity.ToTable("crRptUnitExpenses");

            entity.Property(e => e.RptName).HasMaxLength(30);
            entity.Property(e => e.Status).HasMaxLength(5);
        });

        modelBuilder.Entity<CustCat>(entity =>
        {
            entity.HasIndex(e => e.CustCategoryId, "IX_FK_CustCategoryCustCat");

            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerCustCat");

            entity.HasOne(d => d.CustCategory).WithMany(p => p.CustCats)
                .HasForeignKey(d => d.CustCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustCategoryCustCat");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustCats)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerCustCat");
        });

        modelBuilder.Entity<CustCategory>(entity =>
        {
            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.Name).HasMaxLength(80);
        });

        modelBuilder.Entity<CustEntAccountType>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(40);
            entity.Property(e => e.SysCode).HasMaxLength(10);
        });

        modelBuilder.Entity<CustEntActActionCode>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(80);
            entity.Property(e => e.IconPath).HasMaxLength(80);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.SeqNo).HasDefaultValue(1);
            entity.Property(e => e.SysCode).HasMaxLength(20);
        });

        modelBuilder.Entity<CustEntActActionStatus>(entity =>
        {
            entity.ToTable("CustEntActActionStatus");

            entity.Property(e => e.ActionStatus).HasMaxLength(20);
        });

        modelBuilder.Entity<CustEntActStatus>(entity =>
        {
            entity.ToTable("CustEntActStatus");

            entity.Property(e => e.Status).HasMaxLength(30);
        });

        modelBuilder.Entity<CustEntActivity>(entity =>
        {
            entity.HasIndex(e => e.CustEntActActionCodesId, "IX_FK_CustEntActActionCodesCustEntActivity");

            entity.HasIndex(e => e.CustEntActActionStatusId, "IX_FK_CustEntActActionStatusCustEntActivity");

            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntActivity");

            entity.Property(e => e.ActivityType).HasMaxLength(30);
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Assigned).HasMaxLength(40);
            entity.Property(e => e.Commodity).HasMaxLength(250);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.ProjectName).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.SalesCode).HasMaxLength(40);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(d => d.CustEntActActionCodes).WithMany(p => p.CustEntActivities)
                .HasForeignKey(d => d.CustEntActActionCodesId)
                .HasConstraintName("FK_CustEntActActionCodesCustEntActivity");

            entity.HasOne(d => d.CustEntActActionStatus).WithMany(p => p.CustEntActivities)
                .HasForeignKey(d => d.CustEntActActionStatusId)
                .HasConstraintName("FK_CustEntActActionStatusCustEntActivity");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntActivities)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntActivity");
        });

        modelBuilder.Entity<CustEntActivityType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(20);
        });

        modelBuilder.Entity<CustEntAddress>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntAddress");

            entity.Property(e => e.IsBilling).HasColumnName("isBilling");
            entity.Property(e => e.IsPrimary).HasColumnName("isPrimary");
            entity.Property(e => e.Line1).HasMaxLength(80);
            entity.Property(e => e.Line2).HasMaxLength(80);
            entity.Property(e => e.Line3).HasMaxLength(80);
            entity.Property(e => e.Line4).HasMaxLength(80);
            entity.Property(e => e.Line5).HasMaxLength(80);

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntAddresses)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntAddress");
        });

        modelBuilder.Entity<CustEntAssign>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntAssign");

            entity.Property(e => e.Assigned).HasMaxLength(80);
            entity.Property(e => e.Date).HasColumnType("datetime");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntAssigns)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntAssign");
        });

        modelBuilder.Entity<CustEntCat>(entity =>
        {
            entity.HasIndex(e => e.CustCategoryId, "IX_FK_CustCategoryCustEntCat");

            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntCat");

            entity.HasOne(d => d.CustCategory).WithMany(p => p.CustEntCats)
                .HasForeignKey(d => d.CustCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustCategoryCustEntCat");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntCats)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntCat");
        });

        modelBuilder.Entity<CustEntClause>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntClauses");

            entity.Property(e => e.Desc1).HasMaxLength(250);
            entity.Property(e => e.Desc3).HasMaxLength(250);
            entity.Property(e => e.DtEncoded).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(50);
            entity.Property(e => e.ValidEnd).HasColumnType("datetime");
            entity.Property(e => e.ValidStart).HasColumnType("datetime");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntClauses)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntClauses");
        });

        modelBuilder.Entity<CustEntDocument>(entity =>
        {
            entity.HasIndex(e => e.SupDocumentId, "IX_FK_CustEntDocumentsSupDocument");

            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntDocuments");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntDocuments)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntDocuments");

            entity.HasOne(d => d.SupDocument).WithMany(p => p.CustEntDocuments)
                .HasForeignKey(d => d.SupDocumentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntDocumentsSupDocument");
        });

        modelBuilder.Entity<CustEntMain>(entity =>
        {
            entity.HasIndex(e => e.CustEntAccountTypeId, "IX_FK_AppointmentAcctTypesAppointment");

            entity.Property(e => e.Address).HasMaxLength(180);
            entity.Property(e => e.AssignedTo).HasMaxLength(80);
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Contact1).HasMaxLength(80);
            entity.Property(e => e.Contact2).HasMaxLength(80);
            entity.Property(e => e.CustEntAccountTypeId).HasDefaultValue(1);
            entity.Property(e => e.Exclusive).HasMaxLength(20);
            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.Mobile).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Status).HasMaxLength(40);
            entity.Property(e => e.Website).HasMaxLength(180);

            entity.HasOne(d => d.CustEntAccountType).WithMany(p => p.CustEntMains)
                .HasForeignKey(d => d.CustEntAccountTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AppointmentAcctTypesAppointment");
        });

        modelBuilder.Entity<CustEntity>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainCustEntity");

            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerCustEntity");

            entity.Property(e => e.Company)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.CustAssocTypeId).HasDefaultValue(1);
            entity.Property(e => e.Position).HasMaxLength(50);

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.CustEntities)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainCustEntity");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustEntities)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerCustEntity");
        });

        modelBuilder.Entity<CustFile>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(180);
            entity.Property(e => e.Folder).HasMaxLength(150);
            entity.Property(e => e.Path).HasMaxLength(150);
            entity.Property(e => e.Remarks).HasMaxLength(180);
        });

        modelBuilder.Entity<CustFileRef>(entity =>
        {
            entity.HasIndex(e => e.CustFilesId, "IX_FK_CustFilesCustFileRef");

            entity.Property(e => e.RefTable).HasMaxLength(80);

            entity.HasOne(d => d.CustFiles).WithMany(p => p.CustFileRefs)
                .HasForeignKey(d => d.CustFilesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustFilesCustFileRef");
        });

        modelBuilder.Entity<CustNotif>(entity =>
        {
            entity.Property(e => e.DtEncoded).HasColumnType("datetime");
            entity.Property(e => e.DtScheduled).HasColumnType("datetime");
            entity.Property(e => e.MsgBody).HasMaxLength(360);
            entity.Property(e => e.MsgTitle).HasMaxLength(80);
            entity.Property(e => e.Occurence).HasMaxLength(20);
            entity.Property(e => e.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<CustNotifActivity>(entity =>
        {
            entity.HasIndex(e => e.CustNotifRecipientId, "IX_FK_CustNotifRecipientCustNotifActivity");

            entity.Property(e => e.DtActivity).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(40);

            entity.HasOne(d => d.CustNotifRecipient).WithMany(p => p.CustNotifActivities)
                .HasForeignKey(d => d.CustNotifRecipientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustNotifRecipientCustNotifActivity");
        });

        modelBuilder.Entity<CustNotifRecipient>(entity =>
        {
            entity.HasIndex(e => e.CustNotifId, "IX_FK_CustNotifCustNotifRecipient");

            entity.HasIndex(e => e.NotifRecipientId, "IX_FK_CustNotifRecipientListCustNotifRecipient");

            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerCustNotifRecipient");

            entity.HasOne(d => d.CustNotif).WithMany(p => p.CustNotifRecipients)
                .HasForeignKey(d => d.CustNotifId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustNotifCustNotifRecipient");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustNotifRecipients)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerCustNotifRecipient");

            entity.HasOne(d => d.NotifRecipient).WithMany(p => p.CustNotifRecipients)
                .HasForeignKey(d => d.NotifRecipientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustNotifRecipientListCustNotifRecipient");
        });

        modelBuilder.Entity<CustNotifRecipientList>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_NotifRecipients");
        });

        modelBuilder.Entity<CustSalesCategory>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerCustSalesCategory");

            entity.HasIndex(e => e.SalesLeadCatCodeId, "IX_FK_SalesLeadCatCodeCustSalesCategory");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustSalesCategories)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerCustSalesCategory");

            entity.HasOne(d => d.SalesLeadCatCode).WithMany(p => p.CustSalesCategories)
                .HasForeignKey(d => d.SalesLeadCatCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadCatCodeCustSalesCategory");
        });

        modelBuilder.Entity<CustSocialAcc>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerCustSocialAcc");

            entity.Property(e => e.Facebook).HasMaxLength(80);
            entity.Property(e => e.Skype).HasMaxLength(80);
            entity.Property(e => e.Viber).HasMaxLength(80);

            entity.HasOne(d => d.Customer).WithMany(p => p.CustSocialAccs)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerCustSocialAcc");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.Contact1).HasMaxLength(20);
            entity.Property(e => e.Contact2).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(160);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(120);
            entity.Property(e => e.Status).HasMaxLength(6);
        });

        modelBuilder.Entity<Destination>(entity =>
        {
            entity.HasIndex(e => e.CityId, "IX_FK_CityDestination");

            entity.Property(e => e.ConRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.PubRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.City).WithMany(p => p.Destinations)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityDestination");
        });

        modelBuilder.Entity<DriverInsJobService>(entity =>
        {
            entity.HasIndex(e => e.DriverInstructionsId, "IX_FK_PickupInstructionsDriverInstructions");

            entity.HasOne(d => d.DriverInstructions).WithMany(p => p.DriverInsJobServices)
                .HasForeignKey(d => d.DriverInstructionsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PickupInstructionsDriverInstructions");
        });

        modelBuilder.Entity<DriverInstruction>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(120);
        });

        modelBuilder.Entity<EmailBlasterLog>(entity =>
        {
            entity.Property(e => e.DateTime).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(120);
            entity.Property(e => e.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<EmailBlasterTemplate>(entity =>
        {
            entity.Property(e => e.AttachmentLink).HasMaxLength(200);
            entity.Property(e => e.ContentPicture).HasMaxLength(250);
            entity.Property(e => e.EmailBody).HasMaxLength(750);
            entity.Property(e => e.EmailCategory).HasMaxLength(50);
            entity.Property(e => e.EmailTitle).HasMaxLength(150);
            entity.Property(e => e.RecipientsCategory).HasMaxLength(50);
        });

        modelBuilder.Entity<EntAddress>(entity =>
        {
            entity.HasIndex(e => e.EntCompanyId, "IX_FK_EntCompanyEntAddress");

            entity.HasIndex(e => e.SysSetupTypeId, "IX_FK_SysSetupTypeEntAddress");

            entity.Property(e => e.Add1)
                .HasMaxLength(50)
                .HasColumnName("add1");
            entity.Property(e => e.Add2).HasMaxLength(50);
            entity.Property(e => e.Add3).HasMaxLength(50);
            entity.Property(e => e.Add4).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Telno1).HasMaxLength(20);
            entity.Property(e => e.Telno2).HasMaxLength(20);

            entity.HasOne(d => d.EntCompany).WithMany(p => p.EntAddresses)
                .HasForeignKey(d => d.EntCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EntCompanyEntAddress");

            entity.HasOne(d => d.SysSetupType).WithMany(p => p.EntAddresses)
                .HasForeignKey(d => d.SysSetupTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysSetupTypeEntAddress");
        });

        modelBuilder.Entity<EntBusiness>(entity =>
        {
            entity.Property(e => e.BussRegNo).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.ShortName).HasMaxLength(15);
            entity.Property(e => e.User).HasMaxLength(20);
        });

        modelBuilder.Entity<EntContact>(entity =>
        {
            entity.HasIndex(e => e.EntCompanyId, "IX_FK_EntCompanyEntContact");

            entity.HasIndex(e => e.SysSetupTypeId, "IX_FK_SysSetupTypeEntContact");

            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .HasColumnName("email");
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Position).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.TelNo1).HasMaxLength(20);
            entity.Property(e => e.TelNo2).HasMaxLength(20);

            entity.HasOne(d => d.EntCompany).WithMany(p => p.EntContacts)
                .HasForeignKey(d => d.EntCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EntCompanyEntContact");

            entity.HasOne(d => d.SysSetupType).WithMany(p => p.EntContacts)
                .HasForeignKey(d => d.SysSetupTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysSetupTypeEntContact");
        });

        modelBuilder.Entity<EntService>(entity =>
        {
            entity.HasIndex(e => e.EntCompanyId, "IX_FK_EntCompanyEntServices");

            entity.HasIndex(e => e.SysServiceId, "IX_FK_SysServiceEntServices");

            entity.Property(e => e.Expiry).HasColumnType("datetime");

            entity.HasOne(d => d.EntCompany).WithMany(p => p.EntServices)
                .HasForeignKey(d => d.EntCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EntCompanyEntServices");

            entity.HasOne(d => d.SysService).WithMany(p => p.EntServices)
                .HasForeignKey(d => d.SysServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysServiceEntServices");
        });

        modelBuilder.Entity<EntSetting>(entity =>
        {
            entity.HasIndex(e => e.EntBusinessId, "IX_FK_EntBusinessEntSetting");

            entity.HasIndex(e => e.SysSetupTypeId, "IX_FK_SysSetupTypeEntSetting");

            entity.HasOne(d => d.EntBusiness).WithMany(p => p.EntSettings)
                .HasForeignKey(d => d.EntBusinessId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EntBusinessEntSetting");

            entity.HasOne(d => d.SysSetupType).WithMany(p => p.EntSettings)
                .HasForeignKey(d => d.SysSetupTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysSetupTypeEntSetting");
        });

        modelBuilder.Entity<EntSupportFile>(entity =>
        {
            entity.HasIndex(e => e.EntCompanyId, "IX_FK_EntCompanyEntSupportFile");

            entity.HasIndex(e => e.SysFileTypeId, "IX_FK_SysFileTypeEntSupportFile");

            entity.Property(e => e.UrlPath).HasMaxLength(80);

            entity.HasOne(d => d.EntCompany).WithMany(p => p.EntSupportFiles)
                .HasForeignKey(d => d.EntCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EntCompanyEntSupportFile");

            entity.HasOne(d => d.SysFileType).WithMany(p => p.EntSupportFiles)
                .HasForeignKey(d => d.SysFileTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysFileTypeEntSupportFile");
        });

        modelBuilder.Entity<Expense>(entity =>
        {
            entity.HasIndex(e => e.ExpensesCategoryId, "IX_FK_ExpensesCategoryExpenses");

            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.ExpensesCategory).WithMany(p => p.Expenses)
                .HasForeignKey(d => d.ExpensesCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpensesCategoryExpenses");
        });

        modelBuilder.Entity<ExpensesCategory>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<HrDtr>(entity =>
        {
            entity.HasIndex(e => e.HrDtrStatusId, "IX_FK_HrDtrStatusHrDtr");

            entity.HasIndex(e => e.HrPayrollId, "IX_FK_HrPayrollHrDtr");

            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrDtr");

            entity.HasIndex(e => e.HrSalaryId, "IX_FK_HrSalaryHrDtr");

            entity.Property(e => e.ActualHrs).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtrDate).HasColumnType("datetime");

            entity.HasOne(d => d.HrDtrStatus).WithMany(p => p.HrDtrs)
                .HasForeignKey(d => d.HrDtrStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrDtrStatusHrDtr");

            entity.HasOne(d => d.HrPayroll).WithMany(p => p.HrDtrs)
                .HasForeignKey(d => d.HrPayrollId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPayrollHrDtr");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrDtrs)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrDtr");

            entity.HasOne(d => d.HrSalary).WithMany(p => p.HrDtrs)
                .HasForeignKey(d => d.HrSalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrSalaryHrDtr");
        });

        modelBuilder.Entity<HrDtrStatus>(entity =>
        {
            entity.ToTable("HrDtrStatus");

            entity.Property(e => e.Desc).HasMaxLength(10);
            entity.Property(e => e.Factor).HasColumnType("decimal(18, 0)");
        });

        modelBuilder.Entity<HrPayroll>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrPayroll");

            entity.Property(e => e.Allowance).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Deduction).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtEnd).HasColumnType("datetime");
            entity.Property(e => e.DtStart).HasColumnType("datetime");
            entity.Property(e => e.Monthno).HasMaxLength(2);
            entity.Property(e => e.Salary).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Status).HasMaxLength(3);
            entity.Property(e => e.Yearno).HasMaxLength(4);

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrPayrolls)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrPayroll");
        });

        modelBuilder.Entity<HrPerDoc>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrPerDoc");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrPerDocs)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrPerDoc");
        });

        modelBuilder.Entity<HrPerPosition>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrPerPosition");

            entity.HasIndex(e => e.HrPositionId, "IX_FK_HrPositionHrPerPosition");

            entity.Property(e => e.DtStart).HasColumnType("datetime");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrPerPositions)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrPerPosition");

            entity.HasOne(d => d.HrPosition).WithMany(p => p.HrPerPositions)
                .HasForeignKey(d => d.HrPositionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPositionHrPerPosition");
        });

        modelBuilder.Entity<HrPerSkill>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrPerSkill");

            entity.HasIndex(e => e.HrProficiencyId, "IX_FK_HrProficiencyHrPerSkill");

            entity.HasIndex(e => e.HrSkillId, "IX_FK_HrSkillHrPerSkill");

            entity.Property(e => e.DtAcquired).HasColumnType("datetime");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrPerSkills)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrPerSkill");

            entity.HasOne(d => d.HrProficiency).WithMany(p => p.HrPerSkills)
                .HasForeignKey(d => d.HrProficiencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrProficiencyHrPerSkill");

            entity.HasOne(d => d.HrSkill).WithMany(p => p.HrPerSkills)
                .HasForeignKey(d => d.HrSkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrSkillHrPerSkill");
        });

        modelBuilder.Entity<HrPerTraining>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrPerTraining");

            entity.HasIndex(e => e.HrTrainingId, "IX_FK_HrTrainingHrPerTraining");

            entity.Property(e => e.DtCompleted).HasColumnType("datetime");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrPerTrainings)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrPerTraining");

            entity.HasOne(d => d.HrTraining).WithMany(p => p.HrPerTrainings)
                .HasForeignKey(d => d.HrTrainingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrTrainingHrPerTraining");
        });

        modelBuilder.Entity<HrPersonel>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelStatusId, "IX_FK_HrPersonelStatusHrPersonel");

            entity.Property(e => e.DriverId).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.PassportNo).HasMaxLength(20);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Sssid)
                .HasMaxLength(20)
                .HasColumnName("SSSid");
            entity.Property(e => e.Tin).HasMaxLength(20);

            entity.HasOne(d => d.HrPersonelStatus).WithMany(p => p.HrPersonels)
                .HasForeignKey(d => d.HrPersonelStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelStatusHrPersonel");
        });

        modelBuilder.Entity<HrPersonelStatus>(entity =>
        {
            entity.ToTable("HrPersonelStatus");

            entity.Property(e => e.Desc).HasMaxLength(20);
        });

        modelBuilder.Entity<HrPosition>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<HrProficiency>(entity =>
        {
            entity.Property(e => e.Level).HasMaxLength(20);
        });

        modelBuilder.Entity<HrProfile>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrProfile");

            entity.Property(e => e.Email).HasMaxLength(120);
            entity.Property(e => e.FbAccount)
                .HasMaxLength(120)
                .HasColumnName("fbAccount");
            entity.Property(e => e.FirstName).HasMaxLength(20);
            entity.Property(e => e.LastName).HasMaxLength(30);
            entity.Property(e => e.MiddleName).HasMaxLength(30);
            entity.Property(e => e.Mobile1).HasMaxLength(20);
            entity.Property(e => e.Mobile2).HasMaxLength(20);
            entity.Property(e => e.PresentAddress).HasMaxLength(250);
            entity.Property(e => e.ProvincialAddress).HasMaxLength(250);
            entity.Property(e => e.Spouse).HasMaxLength(80);

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrProfiles)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrProfile");
        });

        modelBuilder.Entity<HrSalary>(entity =>
        {
            entity.HasIndex(e => e.HrPersonelId, "IX_FK_HrPersonelHrSalary");

            entity.Property(e => e.DtStart).HasColumnType("datetime");
            entity.Property(e => e.RatePerHr).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.HrPersonel).WithMany(p => p.HrSalaries)
                .HasForeignKey(d => d.HrPersonelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrPersonelHrSalary");
        });

        modelBuilder.Entity<HrSkill>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<HrTraining>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<HrTrainingSkill>(entity =>
        {
            entity.HasIndex(e => e.HrProficiencyId, "IX_FK_HrProficiencyHrTrainingSkill");

            entity.HasIndex(e => e.HrSkillId, "IX_FK_HrSkillHrTrainingSkill");

            entity.HasIndex(e => e.HrTrainingId, "IX_FK_HrTrainingHrTrainingSkill");

            entity.HasOne(d => d.HrProficiency).WithMany(p => p.HrTrainingSkills)
                .HasForeignKey(d => d.HrProficiencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrProficiencyHrTrainingSkill");

            entity.HasOne(d => d.HrSkill).WithMany(p => p.HrTrainingSkills)
                .HasForeignKey(d => d.HrSkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrSkillHrTrainingSkill");

            entity.HasOne(d => d.HrTraining).WithMany(p => p.HrTrainingSkills)
                .HasForeignKey(d => d.HrTrainingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HrTrainingHrTrainingSkill");
        });

        modelBuilder.Entity<InvCarGateControl>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemInvCarGateControl");

            entity.Property(e => e.Driver).HasMaxLength(50);
            entity.Property(e => e.DtControl)
                .HasColumnType("datetime")
                .HasColumnName("dtControl");
            entity.Property(e => e.InOutFlag).HasColumnName("In_Out_flag");
            entity.Property(e => e.Inspector).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(250);

            entity.HasOne(d => d.InvItem).WithMany(p => p.InvCarGateControls)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemInvCarGateControl");
        });

        modelBuilder.Entity<InvCarMntPriority>(entity =>
        {
            entity.Property(e => e.IconSrc).HasMaxLength(160);
            entity.Property(e => e.Priority).HasMaxLength(20);
        });

        modelBuilder.Entity<InvCarMntRcmd>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemInvCarMntRcmd");

            entity.Property(e => e.DateDue).HasColumnType("datetime");
            entity.Property(e => e.DateRec).HasColumnType("datetime");
            entity.Property(e => e.InvCarMntPriorityId).HasDefaultValue(1);
            entity.Property(e => e.Recommendation).HasMaxLength(160);
            entity.Property(e => e.Remarks).HasMaxLength(120);

            entity.HasOne(d => d.InvCarMntPriority).WithMany(p => p.InvCarMntRcmds)
                .HasForeignKey(d => d.InvCarMntPriorityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvCarMntPriorityInvCarMntRcmd");
        });

        modelBuilder.Entity<InvCarRcmdRequest>(entity =>
        {
            entity.HasIndex(e => e.InvCarMntRcmdId, "IX_FK_InvCarMntRcmdInvCarRcmdRequest");

            entity.HasIndex(e => e.InvCarRcmdStatusId, "IX_FK_InvCarRcmdStatusInvCarRcmdRequest");

            entity.HasOne(d => d.InvCarMntRcmd).WithMany(p => p.InvCarRcmdRequests)
                .HasForeignKey(d => d.InvCarMntRcmdId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvCarMntRcmdInvCarRcmdRequest");

            entity.HasOne(d => d.InvCarRcmdStatus).WithMany(p => p.InvCarRcmdRequests)
                .HasForeignKey(d => d.InvCarRcmdStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvCarRcmdStatusInvCarRcmdRequest");
        });

        modelBuilder.Entity<InvCarRcmdStatus>(entity =>
        {
            entity.ToTable("InvCarRcmdStatus");
        });

        modelBuilder.Entity<InvCarRecord>(entity =>
        {
            entity.HasIndex(e => e.InvCarRecordTypeId, "IX_FK_InvCarRecordTypeInvCarRecord");

            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemInvCarRecord");

            entity.Property(e => e.DtDone)
                .HasColumnType("datetime")
                .HasColumnName("dtDone");
            entity.Property(e => e.NextSched).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.InvCarRecordType).WithMany(p => p.InvCarRecords)
                .HasForeignKey(d => d.InvCarRecordTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvCarRecordTypeInvCarRecord");

            entity.HasOne(d => d.InvItem).WithMany(p => p.InvCarRecords)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemInvCarRecord");
        });

        modelBuilder.Entity<InvCarRecordType>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.IconPath)
                .HasMaxLength(160)
                .IsUnicode(false);
            entity.Property(e => e.OrderNo).HasDefaultValue(1);
            entity.Property(e => e.SysCode).HasMaxLength(50);
        });

        modelBuilder.Entity<InvItem>(entity =>
        {
            entity.Property(e => e.ContactInfo).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.ImgPath).HasMaxLength(80);
            entity.Property(e => e.ItemCode).HasMaxLength(30);
            entity.Property(e => e.OrderNo).HasDefaultValue(999);
            entity.Property(e => e.Remarks).HasMaxLength(150);
            entity.Property(e => e.ViewLabel).HasMaxLength(20);
        });

        modelBuilder.Entity<InvItemCat>(entity =>
        {
            entity.Property(e => e.ImgPath).HasMaxLength(150);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(150);
            entity.Property(e => e.SysCode).HasMaxLength(20);
        });

        modelBuilder.Entity<InvItemCategory>(entity =>
        {
            entity.HasIndex(e => e.InvItemCatId, "IX_FK_InvItemCatInvItemCategory");

            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemInvItemCategory");

            entity.HasOne(d => d.InvItemCat).WithMany(p => p.InvItemCategories)
                .HasForeignKey(d => d.InvItemCatId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemCatInvItemCategory");

            entity.HasOne(d => d.InvItem).WithMany(p => p.InvItemCategories)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemInvItemCategory");
        });

        modelBuilder.Entity<InvItemCrLogUnit>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemInvItemCrLogUnit");
        });

        modelBuilder.Entity<JobAction>(entity =>
        {
            entity.HasIndex(e => e.JobServicesId, "IX_FK_JobServicesJobAction");

            entity.HasIndex(e => e.SrvActionItemId, "IX_FK_SrvActionItemJobAction");

            entity.Property(e => e.AssignedTo).HasMaxLength(80);
            entity.Property(e => e.DtAssigned).HasColumnType("datetime");
            entity.Property(e => e.DtPerformed).HasColumnType("datetime");
            entity.Property(e => e.PerformedBy).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.JobServices).WithMany(p => p.JobActions)
                .HasForeignKey(d => d.JobServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobServicesJobAction");

            entity.HasOne(d => d.SrvActionItem).WithMany(p => p.JobActions)
                .HasForeignKey(d => d.SrvActionItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SrvActionItemJobAction");
        });

        modelBuilder.Entity<JobChecklist>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.DtDue)
                .HasColumnType("datetime")
                .HasColumnName("dtDue");
            entity.Property(e => e.DtEntered)
                .HasColumnType("datetime")
                .HasColumnName("dtEntered");
            entity.Property(e => e.DtNotification)
                .HasColumnType("datetime")
                .HasColumnName("dtNotification");
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<JobContact>(entity =>
        {
            entity.Property(e => e.AddInfo).HasMaxLength(250);
            entity.Property(e => e.Company).HasMaxLength(50);
            entity.Property(e => e.ContactType).HasMaxLength(5);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Position).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.ShortName).HasMaxLength(20);
            entity.Property(e => e.Tel1).HasMaxLength(50);
            entity.Property(e => e.Tel2).HasMaxLength(50);
        });

        modelBuilder.Entity<JobEntMain>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_JobEntMainCustEntMain");

            entity.HasIndex(e => e.JobMainId, "IX_FK_JobEntMainJobMain");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.JobEntMains)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobEntMainCustEntMain");
        });

        modelBuilder.Entity<JobExpense>(entity =>
        {
            entity.HasIndex(e => e.ExpensesId, "IX_FK_ExpensesJobExpenses");

            entity.HasIndex(e => e.JobServicesId, "IX_FK_JobServicesJobExpenses");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtExpense).HasColumnType("datetime");
            entity.Property(e => e.IsReleased).HasColumnName("isReleased");
            entity.Property(e => e.Remarks).HasMaxLength(160);

            entity.HasOne(d => d.Expenses).WithMany(p => p.JobExpenses)
                .HasForeignKey(d => d.ExpensesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpensesJobExpenses");

            entity.HasOne(d => d.JobServices).WithMany(p => p.JobExpenses)
                .HasForeignKey(d => d.JobServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobServicesJobExpenses");
        });

        modelBuilder.Entity<JobItinerary>(entity =>
        {
            entity.HasIndex(e => e.DestinationId, "IX_FK_DestinationJobItinerary");

            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobItinerary");

            entity.Property(e => e.ActualRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.ItiDate).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.Destination).WithMany(p => p.JobItineraries)
                .HasForeignKey(d => d.DestinationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DestinationJobItinerary");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobItineraries)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobItinerary");
        });

        modelBuilder.Entity<JobMain>(entity =>
        {
            entity.HasIndex(e => e.BranchId, "IX_FK_BranchJobMain");

            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerJobMain");

            entity.HasIndex(e => e.JobStatusId, "IX_FK_JobStatusJobMain");

            entity.HasIndex(e => e.JobThruId, "IX_FK_JobThruJobMain");

            entity.Property(e => e.AgreedAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.AssignedTo).HasMaxLength(80);
            entity.Property(e => e.CustContactEmail).HasMaxLength(300);
            entity.Property(e => e.CustContactNumber).HasMaxLength(240);
            entity.Property(e => e.Description).HasMaxLength(180);
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.JobDate).HasColumnType("datetime");
            entity.Property(e => e.JobRemarks).HasMaxLength(180);

            entity.HasOne(d => d.Branch).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.BranchId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BranchJobMain");

            entity.HasOne(d => d.Customer).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerJobMain");

            entity.HasOne(d => d.JobStatus).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.JobStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobStatusJobMain");

            entity.HasOne(d => d.JobThru).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.JobThruId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobThruJobMain");
        });

        modelBuilder.Entity<JobMainPaymentStatus>(entity =>
        {
            entity.ToTable("JobMainPaymentStatus");

            entity.HasIndex(e => e.JobPaymentStatusId, "IX_FK_JobPaymentStatusJobMainPaymentStatus");

            entity.HasOne(d => d.JobPaymentStatus).WithMany(p => p.JobMainPaymentStatuses)
                .HasForeignKey(d => d.JobPaymentStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobPaymentStatusJobMainPaymentStatus");
        });

        modelBuilder.Entity<JobNote>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobNote");

            entity.Property(e => e.Note).HasMaxLength(250);

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobNotes)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobNote");
        });

        modelBuilder.Entity<JobNotificationRequest>(entity =>
        {
            entity.Property(e => e.RefId).HasMaxLength(20);
            entity.Property(e => e.ReqDt).HasColumnType("datetime");
        });

        modelBuilder.Entity<JobPayment>(entity =>
        {
            entity.HasIndex(e => e.BankId, "IX_FK_BankJobPayment");

            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobPayment");

            entity.HasIndex(e => e.JobPaymentTypeId, "IX_FK_JobPaymentTypeJobPayment");

            entity.Property(e => e.DtPayment).HasColumnType("datetime");
            entity.Property(e => e.JobPaymentTypeId).HasDefaultValue(1);
            entity.Property(e => e.PaymentAmt).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.Bank).WithMany(p => p.JobPayments)
                .HasForeignKey(d => d.BankId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BankJobPayment");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobPayments)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobPayment");

            entity.HasOne(d => d.JobPaymentType).WithMany(p => p.JobPayments)
                .HasForeignKey(d => d.JobPaymentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobPaymentTypeJobPayment");
        });

        modelBuilder.Entity<JobPaymentStatus>(entity =>
        {
            entity.ToTable("JobPaymentStatus");

            entity.Property(e => e.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<JobPaymentType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(20);
        });

        modelBuilder.Entity<JobPickup>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobPickup");

            entity.Property(e => e.ContactName).HasMaxLength(80);
            entity.Property(e => e.ContactNumber).HasMaxLength(20);
            entity.Property(e => e.PuDate)
                .HasColumnType("datetime")
                .HasColumnName("puDate");
            entity.Property(e => e.PuLocation)
                .HasMaxLength(80)
                .HasColumnName("puLocation");
            entity.Property(e => e.PuTime)
                .HasMaxLength(5)
                .HasColumnName("puTime");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobPickups)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobPickup");
        });

        modelBuilder.Entity<JobPost>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobPost");

            entity.Property(e => e.CarRentalInc).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtPost).HasColumnType("datetime");
            entity.Property(e => e.ExpensesAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.OthersInc).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.PaymentAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.TourInc).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobPosts)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobPost");
        });

        modelBuilder.Entity<JobPostSale>(entity =>
        {
            entity.HasIndex(e => e.JobServicesId, "IX_FK_JobPostSaleJobServices");

            entity.Property(e => e.DoneBy).HasMaxLength(50);
            entity.Property(e => e.DtPost).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(150);

            entity.HasOne(d => d.JobServices).WithMany(p => p.JobPostSales)
                .HasForeignKey(d => d.JobServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobPostSaleJobServices");
        });

        modelBuilder.Entity<JobService>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobSupplier");

            entity.HasIndex(e => e.ServicesId, "IX_FK_ServicesJobServices");

            entity.HasIndex(e => e.SupplierItemId, "IX_FK_SupplierItemJobServices");

            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierJobSupplier");

            entity.Property(e => e.ActualAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtEnd).HasColumnType("datetime");
            entity.Property(e => e.DtStart).HasColumnType("datetime");
            entity.Property(e => e.Particulars).HasMaxLength(160);
            entity.Property(e => e.QuotedAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(160);
            entity.Property(e => e.SupplierAmt).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobSupplier");

            entity.HasOne(d => d.Services).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.ServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ServicesJobServices");

            entity.HasOne(d => d.Supplier).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierJobSupplier");

            entity.HasOne(d => d.SupplierItem).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.SupplierItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierItemJobServices");
        });

        modelBuilder.Entity<JobServiceItem>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemJobServiceItem");

            entity.HasIndex(e => e.JobServicesId, "IX_FK_JobServicesJobServiceItem");

            entity.HasOne(d => d.InvItem).WithMany(p => p.JobServiceItems)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemJobServiceItem");

            entity.HasOne(d => d.JobServices).WithMany(p => p.JobServiceItems)
                .HasForeignKey(d => d.JobServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobServicesJobServiceItem");
        });

        modelBuilder.Entity<JobServicePickup>(entity =>
        {
            entity.HasIndex(e => e.JobServicesId, "IX_FK_JobServicesJobServicePickup");

            entity.Property(e => e.ClientContact).HasMaxLength(50);
            entity.Property(e => e.ClientName).HasMaxLength(80);
            entity.Property(e => e.JsDate).HasColumnType("datetime");
            entity.Property(e => e.JsLocation).HasMaxLength(80);
            entity.Property(e => e.JsTime).HasMaxLength(10);
            entity.Property(e => e.ProviderContact).HasMaxLength(50);
            entity.Property(e => e.ProviderName).HasMaxLength(80);

            entity.HasOne(d => d.JobServices).WithMany(p => p.JobServicePickups)
                .HasForeignKey(d => d.JobServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobServicesJobServicePickup");
        });

        modelBuilder.Entity<JobStatus>(entity =>
        {
            entity.ToTable("JobStatus");
        });

        modelBuilder.Entity<JobTrail>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Action).HasMaxLength(80);
            entity.Property(e => e.DtTrail)
                .HasColumnType("datetime")
                .HasColumnName("dtTrail");
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Ipaddress)
                .HasMaxLength(50)
                .HasColumnName("IPAddress");
            entity.Property(e => e.RefTable).HasMaxLength(50);
            entity.Property(e => e.User)
                .HasMaxLength(50)
                .HasColumnName("user");
        });

        modelBuilder.Entity<JobType>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobType");

            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Thotel).HasColumnName("THotel");
            entity.Property(e => e.Tothers).HasColumnName("TOthers");
            entity.Property(e => e.Tticket).HasColumnName("TTicket");
            entity.Property(e => e.Ttour).HasColumnName("TTour");
            entity.Property(e => e.Ttransport).HasColumnName("TTransport");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobTypes)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobType");
        });

        modelBuilder.Entity<JobVehicle>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainJobVehicle");

            entity.HasIndex(e => e.VehicleId, "IX_FK_VehicleJobVehicle");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobVehicles)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainJobVehicle");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.JobVehicles)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleJobVehicle");
        });

        modelBuilder.Entity<MigrationHistory>(entity =>
        {
            entity.HasKey(e => new { e.MigrationId, e.ContextKey }).HasName("PK_dbo.__MigrationHistory");

            entity.ToTable("__MigrationHistory");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ContextKey).HasMaxLength(300);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<OnlineReservation>(entity =>
        {
            entity.Property(e => e.ContactNum).HasMaxLength(15);
            entity.Property(e => e.DtPosted).HasColumnType("datetime");
            entity.Property(e => e.DtStart).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(120);
            entity.Property(e => e.PaymentAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.PickupDtls).HasMaxLength(80);
            entity.Property(e => e.ProductCode).HasMaxLength(15);
        });

        modelBuilder.Entity<PaypalAccount>(entity =>
        {
            entity.Property(e => e.Key).HasMaxLength(100);
            entity.Property(e => e.Secret).HasMaxLength(100);
            entity.Property(e => e.SysCode).HasMaxLength(50);
        });

        modelBuilder.Entity<PaypalTransaction>(entity =>
        {
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DatePosted).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.TrxDate).HasColumnType("datetime");
            entity.Property(e => e.TrxId).HasMaxLength(20);
        });

        modelBuilder.Entity<PortalCustomer>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerPortalCustomer");

            entity.Property(e => e.ContactNum).HasMaxLength(15);
            entity.Property(e => e.ExpiryDt).HasColumnType("datetime");
        });

        modelBuilder.Entity<PreDefinedNote>(entity =>
        {
            entity.Property(e => e.Note).HasMaxLength(250);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Code).HasMaxLength(30);
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.Status).HasMaxLength(3);
        });

        modelBuilder.Entity<ProductCondition>(entity =>
        {
            entity.HasIndex(e => e.ProductId, "IX_FK_ProductProductCondition");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Remarks).HasMaxLength(250);

            entity.HasOne(d => d.Product).WithMany(p => p.ProductConditions)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductProductCondition");
        });

        modelBuilder.Entity<ProductImages1>(entity =>
        {
            entity.ToTable("ProductImages1");

            entity.HasIndex(e => e.ProductId, "IX_FK_ProductProductImages");

            entity.Property(e => e.Path).HasMaxLength(250);

            entity.HasOne(d => d.Product).WithMany(p => p.ProductImages1s)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductProductImages");
        });

        modelBuilder.Entity<ProductPrice>(entity =>
        {
            entity.HasIndex(e => e.ProductId, "IX_FK_ProductProductPrice");

            entity.Property(e => e.Rate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Rate1).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Uom).HasMaxLength(20);

            entity.HasOne(d => d.Product).WithMany(p => p.ProductPrices)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductProductPrice");
        });

        modelBuilder.Entity<ProductProdCat>(entity =>
        {
            entity.HasIndex(e => e.ProductCategoryId, "IX_FK_ProductCategoryProductProdCat");

            entity.HasIndex(e => e.ProductId, "IX_FK_ProductProductProdCat");

            entity.HasOne(d => d.ProductCategory).WithMany(p => p.ProductProdCats)
                .HasForeignKey(d => d.ProductCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductCategoryProductProdCat");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductProdCats)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductProductProdCat");
        });

        modelBuilder.Entity<RateGroup>(entity =>
        {
            entity.Property(e => e.GroupName).HasMaxLength(30);
        });

        modelBuilder.Entity<RsvPayment>(entity =>
        {
            entity.HasIndex(e => e.OnlineReservationId, "IX_FK_OnlineReservationRsvPayment");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.DtPayment).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(20);

            entity.HasOne(d => d.OnlineReservation).WithMany(p => p.RsvPayments)
                .HasForeignKey(d => d.OnlineReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OnlineReservationRsvPayment");
        });

        modelBuilder.Entity<SalesActCode>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(40);
            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.SysCode).HasMaxLength(20);
        });

        modelBuilder.Entity<SalesActStatus>(entity =>
        {
            entity.ToTable("SalesActStatus");

            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.Name).HasMaxLength(40);
        });

        modelBuilder.Entity<SalesActivity>(entity =>
        {
            entity.HasIndex(e => e.SalesActCodeId, "IX_FK_SalesActCodeSalesActivity");

            entity.HasIndex(e => e.SalesActStatusId, "IX_FK_SalesActStatusSalesActivity");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesActivity");

            entity.Property(e => e.DtActivity).HasColumnType("datetime");
            entity.Property(e => e.DtEntered).HasColumnType("datetime");
            entity.Property(e => e.EnteredBy).HasMaxLength(80);
            entity.Property(e => e.Particulars).HasMaxLength(250);

            entity.HasOne(d => d.SalesActCode).WithMany(p => p.SalesActivities)
                .HasForeignKey(d => d.SalesActCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesActCodeSalesActivity");

            entity.HasOne(d => d.SalesActStatus).WithMany(p => p.SalesActivities)
                .HasForeignKey(d => d.SalesActStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesActStatusSalesActivity");

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesActivities)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesActivity");
        });

        modelBuilder.Entity<SalesLead>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerSalesLead");

            entity.Property(e => e.AssignedTo).HasMaxLength(80);
            entity.Property(e => e.Commodity).HasMaxLength(150);
            entity.Property(e => e.CustEmail).HasMaxLength(80);
            entity.Property(e => e.CustName).HasMaxLength(80);
            entity.Property(e => e.CustPhone).HasMaxLength(20);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Details).HasMaxLength(250);
            entity.Property(e => e.DtEntered).HasColumnType("datetime");
            entity.Property(e => e.EnteredBy).HasMaxLength(80);
            entity.Property(e => e.ItemWeight).HasMaxLength(20);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.SalesCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Customer).WithMany(p => p.SalesLeads)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerSalesLead");
        });

        modelBuilder.Entity<SalesLeadCatCode>(entity =>
        {
            entity.Property(e => e.CatName).HasMaxLength(80);
            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.SysCode).HasMaxLength(20);
        });

        modelBuilder.Entity<SalesLeadCategory>(entity =>
        {
            entity.HasIndex(e => e.SalesLeadCatCodeId, "IX_FK_SalesLeadCatCodeSalesLeadCategory");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesLeadCategory");

            entity.HasOne(d => d.SalesLeadCatCode).WithMany(p => p.SalesLeadCategories)
                .HasForeignKey(d => d.SalesLeadCatCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadCatCodeSalesLeadCategory");

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesLeadCategories)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesLeadCategory");
        });

        modelBuilder.Entity<SalesLeadCompany>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainSalesLeadCompany");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesLeadCompany");

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.SalesLeadCompanies)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainSalesLeadCompany");
        });

        modelBuilder.Entity<SalesLeadFile>(entity =>
        {
            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesLeadFile");

            entity.Property(e => e.Link).HasMaxLength(250);

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesLeadFiles)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesLeadFile");
        });

        modelBuilder.Entity<SalesLeadItem>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemSalesLeadItems");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesLeadItems");

            entity.Property(e => e.QuotedPrice).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(80);

            entity.HasOne(d => d.InvItem).WithMany(p => p.SalesLeadItems)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemSalesLeadItems");

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesLeadItems)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesLeadItems");
        });

        modelBuilder.Entity<SalesLeadLink>(entity =>
        {
            entity.HasIndex(e => e.JobMainId, "IX_FK_JobMainSalesLeadLink");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesLeadLink");

            entity.HasOne(d => d.JobMain).WithMany(p => p.SalesLeadLinks)
                .HasForeignKey(d => d.JobMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobMainSalesLeadLink");

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesLeadLinks)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesLeadLink");
        });

        modelBuilder.Entity<SalesLeadQuotedItem>(entity =>
        {
            entity.HasIndex(e => e.SalesLeadItemsId, "IX_FK_SalesLeadItemsSalesLeadQuotedItem");

            entity.HasIndex(e => e.SupplierItemRateId, "IX_FK_SupplierItemRateSalesLeadQuotedItem");

            entity.Property(e => e.SalesLeadQuotedItemStatusId).HasDefaultValue(1);

            entity.HasOne(d => d.SalesLeadItems).WithMany(p => p.SalesLeadQuotedItems)
                .HasForeignKey(d => d.SalesLeadItemsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadItemsSalesLeadQuotedItem");

            entity.HasOne(d => d.SupplierItemRate).WithMany(p => p.SalesLeadQuotedItems)
                .HasForeignKey(d => d.SupplierItemRateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierItemRateSalesLeadQuotedItem");
        });

        modelBuilder.Entity<SalesLeadQuotedItemStatus>(entity =>
        {
            entity.ToTable("SalesLeadQuotedItemStatus");
        });

        modelBuilder.Entity<SalesLeadSupActivity>(entity =>
        {
            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSupActivitySalesLead");

            entity.HasIndex(e => e.SupplierActivityId, "IX_FK_SalesLeadSupActivitySupplierActivity");

            entity.Property(e => e.IconPath).HasMaxLength(80);

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesLeadSupActivities)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSupActivitySalesLead");

            entity.HasOne(d => d.SupplierActivity).WithMany(p => p.SalesLeadSupActivities)
                .HasForeignKey(d => d.SupplierActivityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSupActivitySupplierActivity");
        });

        modelBuilder.Entity<SalesProcStatus>(entity =>
        {
            entity.ToTable("SalesProcStatus");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesProcStatus");

            entity.HasIndex(e => e.SalesProcStatusCodeId, "IX_FK_SalesProcStatusSalesProcStatusCode");

            entity.Property(e => e.DtStatus).HasColumnType("datetime");

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesProcStatuses)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesProcStatus");

            entity.HasOne(d => d.SalesProcStatusCode).WithMany(p => p.SalesProcStatuses)
                .HasForeignKey(d => d.SalesProcStatusCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesProcStatusSalesProcStatusCode");
        });

        modelBuilder.Entity<SalesProcStatusCode>(entity =>
        {
            entity.Property(e => e.IconPath).HasColumnName("iconPath");
            entity.Property(e => e.Name).HasMaxLength(80);
        });

        modelBuilder.Entity<SalesStatus>(entity =>
        {
            entity.ToTable("SalesStatus");

            entity.HasIndex(e => e.SalesLeadId, "IX_FK_SalesLeadSalesStatus");

            entity.HasIndex(e => e.SalesStatusCodeId, "IX_FK_SalesStatusCodeSalesStatus");

            entity.Property(e => e.DtStatus).HasColumnType("datetime");
            entity.Property(e => e.SalesStatusStatusId).HasDefaultValue(1);

            entity.HasOne(d => d.SalesLead).WithMany(p => p.SalesStatuses)
                .HasForeignKey(d => d.SalesLeadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesLeadSalesStatus");

            entity.HasOne(d => d.SalesStatusCode).WithMany(p => p.SalesStatuses)
                .HasForeignKey(d => d.SalesStatusCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesStatusCodeSalesStatus");
        });

        modelBuilder.Entity<SalesStatusCode>(entity =>
        {
            entity.HasIndex(e => e.SalesStatusTypeId, "IX_FK_SalesStatusTypeSalesStatusCode");

            entity.Property(e => e.IconPath)
                .HasMaxLength(150)
                .HasColumnName("iconPath");
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.OrderNo).HasDefaultValue(1);
            entity.Property(e => e.SalesStatusTypeId).HasDefaultValue(1);

            entity.HasOne(d => d.SalesStatusType).WithMany(p => p.SalesStatusCodes)
                .HasForeignKey(d => d.SalesStatusTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalesStatusTypeSalesStatusCode");
        });

        modelBuilder.Entity<SalesStatusStatus>(entity =>
        {
            entity.ToTable("SalesStatusStatus");

            entity.Property(e => e.Status).HasMaxLength(40);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SmBranch>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);
        });

        modelBuilder.Entity<SmCategory>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<SmFile>(entity =>
        {
            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmFile");

            entity.Property(e => e.Desc).HasMaxLength(80);
            entity.Property(e => e.Link).HasMaxLength(200);

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmFiles)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmFile");
        });

        modelBuilder.Entity<SmProdAd>(entity =>
        {
            entity.HasIndex(e => e.SmCategoryId, "IX_FK_SmCategorySmProdAds");

            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmProdAds");

            entity.HasOne(d => d.SmCategory).WithMany(p => p.SmProdAds)
                .HasForeignKey(d => d.SmCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmCategorySmProdAds");

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmProdAds)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmProdAds");
        });

        modelBuilder.Entity<SmProdCat>(entity =>
        {
            entity.HasIndex(e => e.SmCategoryId, "IX_FK_SmCategorySmProdCat");

            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmProdCat");

            entity.HasOne(d => d.SmCategory).WithMany(p => p.SmProdCats)
                .HasForeignKey(d => d.SmCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmCategorySmProdCat");

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmProdCats)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmProdCat");
        });

        modelBuilder.Entity<SmProdDesc>(entity =>
        {
            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmProdDesc");

            entity.Property(e => e.Description).HasMaxLength(180);

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmProdDescs)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmProdDesc");
        });

        modelBuilder.Entity<SmProdInfo>(entity =>
        {
            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmProdInfo");

            entity.Property(e => e.Label).HasMaxLength(10);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Value).HasMaxLength(80);

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmProdInfos)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmProdInfo");
        });

        modelBuilder.Entity<SmProdStatus>(entity =>
        {
            entity.ToTable("SmProdStatus");

            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<SmProdSupplier>(entity =>
        {
            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmProdSupplier");

            entity.HasIndex(e => e.SmSupplierId, "IX_FK_SmSupplierSmProdSupplier");

            entity.Property(e => e.Contracted).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.ValidEnd).HasColumnType("datetime");
            entity.Property(e => e.ValidStart).HasColumnType("datetime");

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmProdSuppliers)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmProdSupplier");

            entity.HasOne(d => d.SmSupplier).WithMany(p => p.SmProdSuppliers)
                .HasForeignKey(d => d.SmSupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmSupplierSmProdSupplier");
        });

        modelBuilder.Entity<SmProduct>(entity =>
        {
            entity.HasIndex(e => e.SmBranchId, "IX_FK_SmBranchSmProduct");

            entity.HasIndex(e => e.SmProdStatusId, "IX_FK_SmProdStatusSmProduct");

            entity.Property(e => e.Code).HasMaxLength(10);
            entity.Property(e => e.Contracted).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.ValidEnd).HasColumnType("datetime");
            entity.Property(e => e.ValidStart).HasColumnType("datetime");

            entity.HasOne(d => d.SmBranch).WithMany(p => p.SmProducts)
                .HasForeignKey(d => d.SmBranchId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmBranchSmProduct");

            entity.HasOne(d => d.SmProdStatus).WithMany(p => p.SmProducts)
                .HasForeignKey(d => d.SmProdStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProdStatusSmProduct");
        });

        modelBuilder.Entity<SmRate>(entity =>
        {
            entity.HasIndex(e => e.SmProductId, "IX_FK_SmProductSmRate");

            entity.HasIndex(e => e.SmRateUoMid, "IX_FK_SmRateSmRateUoM");

            entity.Property(e => e.Drate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("DRate");
            entity.Property(e => e.Rate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.SmRateUoMid).HasColumnName("SmRateUoMId");

            entity.HasOne(d => d.SmProduct).WithMany(p => p.SmRates)
                .HasForeignKey(d => d.SmProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmProductSmRate");

            entity.HasOne(d => d.SmRateUoM).WithMany(p => p.SmRates)
                .HasForeignKey(d => d.SmRateUoMid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmRateSmRateUoM");
        });

        modelBuilder.Entity<SmRateUoM>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<SmSupplier>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<SmSupplierInfo>(entity =>
        {
            entity.HasIndex(e => e.SmSupplierId, "IX_FK_SmSupplierSmSupplierInfo");

            entity.Property(e => e.Label).HasMaxLength(10);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Value).HasMaxLength(80);

            entity.HasOne(d => d.SmSupplier).WithMany(p => p.SmSupplierInfos)
                .HasForeignKey(d => d.SmSupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmSupplierSmSupplierInfo");
        });

        modelBuilder.Entity<SrvActionCode>(entity =>
        {
            entity.Property(e => e.CatCode).HasMaxLength(80);
        });

        modelBuilder.Entity<SrvActionItem>(entity =>
        {
            entity.HasIndex(e => e.ServicesId, "IX_FK_ServicesSrvActionItem");

            entity.HasIndex(e => e.SrvActionCodeId, "IX_FK_SrvActionCodeSrvActionItem");

            entity.Property(e => e.Desc).HasMaxLength(150);
            entity.Property(e => e.Remarks).HasMaxLength(180);

            entity.HasOne(d => d.Services).WithMany(p => p.SrvActionItems)
                .HasForeignKey(d => d.ServicesId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ServicesSrvActionItem");
        });

        modelBuilder.Entity<SupDocument>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasIndex(e => e.CityId, "IX_FK_CitySupplier");

            entity.HasIndex(e => e.CountryId, "IX_FK_SupplierCountry");

            entity.HasIndex(e => e.SupplierTypeId, "IX_FK_SupplierTypeSupplier");

            entity.Property(e => e.Address).HasMaxLength(120);
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Contact1).HasMaxLength(20);
            entity.Property(e => e.Contact2).HasMaxLength(20);
            entity.Property(e => e.Contact3).HasMaxLength(20);
            entity.Property(e => e.CountryId).HasDefaultValue(175);
            entity.Property(e => e.Details).HasMaxLength(500);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.Website)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.Suppliers)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CitySupplier");

            entity.HasOne(d => d.Country).WithMany(p => p.Suppliers)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierCountry");

            entity.HasOne(d => d.SupplierType).WithMany(p => p.Suppliers)
                .HasForeignKey(d => d.SupplierTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierTypeSupplier");
        });

        modelBuilder.Entity<SupplierActActionCode>(entity =>
        {
            entity.Property(e => e.Desc).HasMaxLength(80);
            entity.Property(e => e.IconPath)
                .HasMaxLength(80)
                .HasColumnName("iconPath");
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.SysCode).HasMaxLength(20);
        });

        modelBuilder.Entity<SupplierActActionStatus>(entity =>
        {
            entity.ToTable("SupplierActActionStatus");

            entity.Property(e => e.ActionStatus).HasMaxLength(20);
        });

        modelBuilder.Entity<SupplierActStatus>(entity =>
        {
            entity.ToTable("SupplierActStatus");
        });

        modelBuilder.Entity<SupplierActivity>(entity =>
        {
            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierSupplierActivity");

            entity.Property(e => e.ActivityType).HasMaxLength(160);
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Assigned).HasMaxLength(40);
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.DtActivity).HasColumnType("datetime");
            entity.Property(e => e.ProjName).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.SupplierActActionCodeId).HasDefaultValue(1);
            entity.Property(e => e.SupplierActActionStatusId).HasDefaultValue(1);
            entity.Property(e => e.SupplierActStatusId).HasDefaultValue(1);
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierActivities)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierSupplierActivity");
        });

        modelBuilder.Entity<SupplierContact>(entity =>
        {
            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierSupplierContact");

            entity.Property(e => e.Department).HasMaxLength(40);
            entity.Property(e => e.Email).HasMaxLength(80);
            entity.Property(e => e.Position).HasMaxLength(40);
            entity.Property(e => e.SupplierContactStatusId).HasDefaultValue(1);
            entity.Property(e => e.WeChat).HasMaxLength(40);
            entity.Property(e => e.WhatsApp).HasMaxLength(80);

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierContacts)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierSupplierContact");
        });

        modelBuilder.Entity<SupplierContactStatus>(entity =>
        {
            entity.ToTable("SupplierContactStatus");
        });

        modelBuilder.Entity<SupplierDocument>(entity =>
        {
            entity.HasIndex(e => e.SupDocumentId, "IX_FK_SupDocumentSupplierDocument");

            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierSupplierDocument");

            entity.HasOne(d => d.SupDocument).WithMany(p => p.SupplierDocuments)
                .HasForeignKey(d => d.SupDocumentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupDocumentSupplierDocument");

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierDocuments)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierSupplierDocument");
        });

        modelBuilder.Entity<SupplierInvItem>(entity =>
        {
            entity.HasIndex(e => e.InvItemId, "IX_FK_InvItemSupplierInvItem");

            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierSupplierInvItem");

            entity.HasOne(d => d.InvItem).WithMany(p => p.SupplierInvItems)
                .HasForeignKey(d => d.InvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvItemSupplierInvItem");

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierInvItems)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierSupplierInvItem");
        });

        modelBuilder.Entity<SupplierItem>(entity =>
        {
            entity.HasIndex(e => e.SupplierId, "IX_FK_SupplierSupplierItem");

            entity.Property(e => e.Description).HasMaxLength(30);
            entity.Property(e => e.InCharge).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Status).HasMaxLength(6);

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierItems)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierSupplierItem");
        });

        modelBuilder.Entity<SupplierItemRate>(entity =>
        {
            entity.HasIndex(e => e.SupplierInvItemId, "IX_FK_SupplierInvItemSupplierItemRate");

            entity.HasIndex(e => e.SupplierUnitId, "IX_FK_SupplierUnitSupplierItemRate");

            entity.Property(e => e.By).HasMaxLength(50);
            entity.Property(e => e.DtEntered).HasMaxLength(50);
            entity.Property(e => e.Material).HasMaxLength(40);
            entity.Property(e => e.Origin).HasMaxLength(80);
            entity.Property(e => e.Particulars).HasMaxLength(80);
            entity.Property(e => e.ProcBy).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.Tolerance).HasMaxLength(80);
            entity.Property(e => e.TradeTerm).HasMaxLength(120);

            entity.HasOne(d => d.SupplierInvItem).WithMany(p => p.SupplierItemRates)
                .HasForeignKey(d => d.SupplierInvItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierInvItemSupplierItemRate");

            entity.HasOne(d => d.SupplierUnit).WithMany(p => p.SupplierItemRates)
                .HasForeignKey(d => d.SupplierUnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierUnitSupplierItemRate");
        });

        modelBuilder.Entity<SupplierPoDtl>(entity =>
        {
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<SupplierPoHdr>(entity =>
        {
            entity.Property(e => e.ApprovedBy).HasMaxLength(80);
            entity.Property(e => e.DtApproved).HasColumnType("datetime");
            entity.Property(e => e.DtRequest).HasColumnType("datetime");
            entity.Property(e => e.PoDate).HasColumnType("datetime");
            entity.Property(e => e.Remarks).HasMaxLength(250);
        });

        modelBuilder.Entity<SupplierPoStatus>(entity =>
        {
            entity.ToTable("SupplierPoStatus");
        });

        modelBuilder.Entity<SysAccessRole>(entity =>
        {
            entity.HasIndex(e => e.SysMenuId, "IX_FK_SysMenuSysRoleAccess");

            entity.HasOne(d => d.SysMenu).WithMany(p => p.SysAccessRoles)
                .HasForeignKey(d => d.SysMenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysMenuSysRoleAccess");
        });

        modelBuilder.Entity<SysAccessUser>(entity =>
        {
            entity.HasIndex(e => e.SysMenuId, "IX_FK_SysMenuSysUserAccess");

            entity.Property(e => e.SecKey).HasDefaultValue(1);

            entity.HasOne(d => d.SysMenu).WithMany(p => p.SysAccessUsers)
                .HasForeignKey(d => d.SysMenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysMenuSysUserAccess");
        });

        modelBuilder.Entity<SysCmdIdRef>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.Remarks).HasMaxLength(150);
        });

        modelBuilder.Entity<SysMenu>(entity =>
        {
            entity.Property(e => e.Action).HasMaxLength(30);
            entity.Property(e => e.Controller).HasMaxLength(30);
            entity.Property(e => e.Params).HasMaxLength(80);
            entity.Property(e => e.SecKey).HasDefaultValue(1);
            entity.Property(e => e.Seqno).HasDefaultValue(1);
        });

        modelBuilder.Entity<SysService>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.IconFa)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("IconFA");
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.SeqNo).HasDefaultValue(1);
            entity.Property(e => e.Status).HasMaxLength(5);
            entity.Property(e => e.SysCode).HasMaxLength(10);
        });

        modelBuilder.Entity<SysServiceMenu>(entity =>
        {
            entity.HasIndex(e => e.SysMenuId, "IX_FK_SysMenuSysServiceMenu");

            entity.HasIndex(e => e.SysServiceId, "IX_FK_SysServiceSysServiceMenu");

            entity.HasOne(d => d.SysMenu).WithMany(p => p.SysServiceMenus)
                .HasForeignKey(d => d.SysMenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysMenuSysServiceMenu");

            entity.HasOne(d => d.SysService).WithMany(p => p.SysServiceMenus)
                .HasForeignKey(d => d.SysServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SysServiceSysServiceMenu");
        });

        modelBuilder.Entity<SysSetupType>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.Status).HasMaxLength(3);
            entity.Property(e => e.SysCode).HasMaxLength(10);
        });

        modelBuilder.Entity<TpArea>(entity =>
        {
            entity.ToTable("tpAreas");

            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.PageRemarks).HasMaxLength(255);
            entity.Property(e => e.PageView).HasMaxLength(30);
            entity.Property(e => e.PgFeatureImg).HasMaxLength(150);
        });

        modelBuilder.Entity<TpCategory>(entity =>
        {
            entity.ToTable("tpCategories");

            entity.Property(e => e.Description).HasMaxLength(80);
            entity.Property(e => e.SysCode).HasMaxLength(10);
        });

        modelBuilder.Entity<TpInqService>(entity =>
        {
            entity.ToTable("tpInqServices");

            entity.HasIndex(e => e.TpInquiryId, "IX_FK_tpInquirytpInqServices");

            entity.HasIndex(e => e.TpProductsId, "IX_FK_tpProductstpInqServices");

            entity.Property(e => e.DtSvcStart)
                .HasColumnType("datetime")
                .HasColumnName("dtSvcStart");
            entity.Property(e => e.Message).HasMaxLength(250);
            entity.Property(e => e.TpInquiryId).HasColumnName("tpInquiryId");
            entity.Property(e => e.TpProductsId).HasColumnName("tpProductsId");

            entity.HasOne(d => d.TpInquiry).WithMany(p => p.TpInqServices)
                .HasForeignKey(d => d.TpInquiryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpInquirytpInqServices");

            entity.HasOne(d => d.TpProducts).WithMany(p => p.TpInqServices)
                .HasForeignKey(d => d.TpProductsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpProductstpInqServices");
        });

        modelBuilder.Entity<TpInquiry>(entity =>
        {
            entity.ToTable("tpInquiries");

            entity.Property(e => e.ContactNo).HasMaxLength(50);
            entity.Property(e => e.DtInquiry)
                .HasColumnType("datetime")
                .HasColumnName("dtInquiry");
            entity.Property(e => e.Email).HasMaxLength(120);
            entity.Property(e => e.LeadGuest).HasMaxLength(250);
            entity.Property(e => e.Status).HasMaxLength(10);
        });

        modelBuilder.Entity<TpProdCat>(entity =>
        {
            entity.ToTable("tpProdCats");

            entity.HasIndex(e => e.TpCategoryId, "IX_FK_tpCategorytpProdCat");

            entity.HasIndex(e => e.TpProductsId, "IX_FK_tpProductstpProdCat");

            entity.Property(e => e.TpCategoryId).HasColumnName("tpCategoryId");
            entity.Property(e => e.TpProductsId).HasColumnName("tpProductsId");

            entity.HasOne(d => d.TpCategory).WithMany(p => p.TpProdCats)
                .HasForeignKey(d => d.TpCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpCategorytpProdCat");

            entity.HasOne(d => d.TpProducts).WithMany(p => p.TpProdCats)
                .HasForeignKey(d => d.TpProductsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpProductstpProdCat");
        });

        modelBuilder.Entity<TpProdRate>(entity =>
        {
            entity.ToTable("tpProdRates");

            entity.HasIndex(e => e.TpProductsId, "IX_FK_tpProductstpProdRate");

            entity.HasIndex(e => e.TpUomId, "IX_FK_tpUomtpProdRate");

            entity.Property(e => e.Rate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Remarks).HasMaxLength(80);
            entity.Property(e => e.TpProductsId).HasColumnName("tpProductsId");
            entity.Property(e => e.TpUomId).HasColumnName("tpUomId");

            entity.HasOne(d => d.TpProducts).WithMany(p => p.TpProdRates)
                .HasForeignKey(d => d.TpProductsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpProductstpProdRate");

            entity.HasOne(d => d.TpUom).WithMany(p => p.TpProdRates)
                .HasForeignKey(d => d.TpUomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpUomtpProdRate");
        });

        modelBuilder.Entity<TpProduct>(entity =>
        {
            entity.ToTable("tpProducts");

            entity.HasIndex(e => e.TpAreasId, "IX_FK_tpAreastpProducts");

            entity.Property(e => e.Name).HasMaxLength(80);
            entity.Property(e => e.PageView).HasMaxLength(50);
            entity.Property(e => e.PgFeatureImg).HasMaxLength(150);
            entity.Property(e => e.ShortRemarks).HasMaxLength(250);
            entity.Property(e => e.TpAreasId).HasColumnName("tpAreasId");

            entity.HasOne(d => d.TpAreas).WithMany(p => p.TpProducts)
                .HasForeignKey(d => d.TpAreasId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpAreastpProducts");
        });

        modelBuilder.Entity<TpProductDesc>(entity =>
        {
            entity.ToTable("tpProductDescs");

            entity.HasIndex(e => e.TpProductsId, "IX_FK_tpProductstpProductDesc");

            entity.Property(e => e.TpDesc)
                .HasMaxLength(250)
                .HasColumnName("tpDesc");
            entity.Property(e => e.TpDescH1)
                .HasMaxLength(30)
                .HasColumnName("tpDescH1");
            entity.Property(e => e.TpDescH2)
                .HasMaxLength(50)
                .HasColumnName("tpDescH2");
            entity.Property(e => e.TpProductsId).HasColumnName("tpProductsId");

            entity.HasOne(d => d.TpProducts).WithMany(p => p.TpProductDescs)
                .HasForeignKey(d => d.TpProductsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpProductstpProductDesc");
        });

        modelBuilder.Entity<TpProductImage>(entity =>
        {
            entity.ToTable("tpProductImages");

            entity.HasIndex(e => e.TpProductsId, "IX_FK_tpProductstpProductImages");

            entity.Property(e => e.AltName).HasMaxLength(80);
            entity.Property(e => e.Desc).HasMaxLength(150);
            entity.Property(e => e.ImgPath).HasMaxLength(250);
            entity.Property(e => e.TpProductsId).HasColumnName("tpProductsId");

            entity.HasOne(d => d.TpProducts).WithMany(p => p.TpProductImages)
                .HasForeignKey(d => d.TpProductsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tpProductstpProductImages");
        });

        modelBuilder.Entity<TpUom>(entity =>
        {
            entity.ToTable("tpUoms");

            entity.Property(e => e.Measure).HasMaxLength(30);
            entity.Property(e => e.Remarks).HasMaxLength(180);
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasIndex(e => e.CustEntMainId, "IX_FK_CustEntMainVehicle");

            entity.HasIndex(e => e.CustomerId, "IX_FK_CustomerVehicle");

            entity.HasIndex(e => e.VehicleModelId, "IX_FK_VehicleModelVehicle");

            entity.Property(e => e.ChassisNo).HasMaxLength(50);
            entity.Property(e => e.Color).HasMaxLength(30);
            entity.Property(e => e.Conduction).HasMaxLength(10);
            entity.Property(e => e.EngineNo).HasMaxLength(50);
            entity.Property(e => e.PlateNo).HasMaxLength(10);
            entity.Property(e => e.Remarks).HasMaxLength(250);
            entity.Property(e => e.YearModel).HasMaxLength(4);

            entity.HasOne(d => d.CustEntMain).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.CustEntMainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustEntMainVehicle");

            entity.HasOne(d => d.Customer).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerVehicle");

            entity.HasOne(d => d.VehicleModel).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.VehicleModelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleModelVehicle");
        });

        modelBuilder.Entity<VehicleBrand>(entity =>
        {
            entity.Property(e => e.Brand).HasMaxLength(20);
        });

        modelBuilder.Entity<VehicleDrife>(entity =>
        {
            entity.Property(e => e.Drive).HasMaxLength(10);
        });

        modelBuilder.Entity<VehicleFuel>(entity =>
        {
            entity.Property(e => e.Fuel).HasMaxLength(10);
        });

        modelBuilder.Entity<VehicleModel>(entity =>
        {
            entity.HasIndex(e => e.VehicleBrandId, "IX_FK_VehicleBrandVehicleMake");

            entity.HasIndex(e => e.VehicleDriveId, "IX_FK_VehicleDriveVehicleModel");

            entity.HasIndex(e => e.VehicleFuelId, "IX_FK_VehicleFuelVehicleMake");

            entity.HasIndex(e => e.VehicleTransmissionId, "IX_FK_VehicleTransmissionVehicleMake");

            entity.HasIndex(e => e.VehicleTypeId, "IX_FK_VehicleTypeVehicleMake");

            entity.Property(e => e.GearOil).HasMaxLength(10);
            entity.Property(e => e.Make).HasMaxLength(50);
            entity.Property(e => e.MotorOil).HasMaxLength(10);
            entity.Property(e => e.TransmissionOil).HasMaxLength(10);

            entity.HasOne(d => d.VehicleBrand).WithMany(p => p.VehicleModels)
                .HasForeignKey(d => d.VehicleBrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleBrandVehicleMake");

            entity.HasOne(d => d.VehicleDrive).WithMany(p => p.VehicleModels)
                .HasForeignKey(d => d.VehicleDriveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleDriveVehicleModel");

            entity.HasOne(d => d.VehicleFuel).WithMany(p => p.VehicleModels)
                .HasForeignKey(d => d.VehicleFuelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleFuelVehicleMake");

            entity.HasOne(d => d.VehicleTransmission).WithMany(p => p.VehicleModels)
                .HasForeignKey(d => d.VehicleTransmissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleTransmissionVehicleMake");

            entity.HasOne(d => d.VehicleType).WithMany(p => p.VehicleModels)
                .HasForeignKey(d => d.VehicleTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleTypeVehicleMake");
        });

        modelBuilder.Entity<VehicleTransmission>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(5);
        });

        modelBuilder.Entity<VehicleType>(entity =>
        {
            entity.Property(e => e.Type).HasMaxLength(10);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
