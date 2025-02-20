using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("Customer_Contact")]
public partial class CustomerContact
{
    [Key]
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? ContactId { get; set; }

    [ForeignKey("ContactId")]
    [InverseProperty("CustomerContacts")]
    public virtual Contact? Contact { get; set; }

    [ForeignKey("CustomerId")]
    [InverseProperty("CustomerContacts")]
    public virtual Customer? Customer { get; set; }
}
