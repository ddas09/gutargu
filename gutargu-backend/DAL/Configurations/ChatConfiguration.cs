using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gutargu.Backend.DAL.Configurations;

internal class ChatConfiguration : BaseEntityConfiguration<Chat>
{
    public override void Configure(EntityTypeBuilder<Chat> builder)
    {
        base.Configure(builder);

        builder.HasIndex(chat => new { chat.SenderId, chat.ReceiverId, chat.CreatedDate });
    }
}

