using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gutargu.Backend.DAL.Configurations;

internal class UserConfiguration : BaseEntityConfiguration<User>
{
    public override void Configure(EntityTypeBuilder<User> builder)
    {
        base.Configure(builder);

        builder.HasIndex(u => u.Email)
            .IsUnique();
    }
}

