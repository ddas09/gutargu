using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gutargu.Backend.DAL.Configurations;

internal class UserContactConfiguration : BaseEntityConfiguration<UserContact>
{
    public override void Configure(EntityTypeBuilder<UserContact> builder)
    {
        base.Configure(builder);
    }
}

