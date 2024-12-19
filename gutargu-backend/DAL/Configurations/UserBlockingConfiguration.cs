using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gutargu.Backend.DAL.Configurations;

internal class UserBlockingConfiguration : BaseEntityConfiguration<UserBlocking>
{
    public override void Configure(EntityTypeBuilder<UserBlocking> builder)
    {
        base.Configure(builder);
    }
}

