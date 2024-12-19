using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gutargu_backend.DAL.Migrations
{
    /// <inheritdoc />
    public partial class makelastchatidnullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserContacts_Chats_LastChatId",
                table: "UserContacts");

            migrationBuilder.AlterColumn<int>(
                name: "LastChatId",
                table: "UserContacts",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_UserContacts_Chats_LastChatId",
                table: "UserContacts",
                column: "LastChatId",
                principalTable: "Chats",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserContacts_Chats_LastChatId",
                table: "UserContacts");

            migrationBuilder.AlterColumn<int>(
                name: "LastChatId",
                table: "UserContacts",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserContacts_Chats_LastChatId",
                table: "UserContacts",
                column: "LastChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
