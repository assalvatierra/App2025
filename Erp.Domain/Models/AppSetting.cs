namespace Erp.Domain.Models;

public partial class AppSetting
{
    public int Id { get; set; }

    public string SysKey { get; set; } = null!;

    public string SysValue { get; set; } = null!;

    public string? Remarks { get; set; }
}
