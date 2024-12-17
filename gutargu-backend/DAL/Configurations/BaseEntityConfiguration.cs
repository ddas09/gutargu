﻿using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gutargu.Backend.DAL.Configurations;

internal class BaseEntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        builder.Property(x => x.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
        builder.Property(x => x.UpdatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}

