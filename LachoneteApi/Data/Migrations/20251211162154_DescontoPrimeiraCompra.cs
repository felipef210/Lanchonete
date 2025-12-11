using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LachoneteApi.Migrations
{
    /// <inheritdoc />
    public partial class DescontoPrimeiraCompra : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PrimeiroPedido",
                table: "Pedidos",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrimeiroPedido",
                table: "Pedidos");
        }
    }
}
