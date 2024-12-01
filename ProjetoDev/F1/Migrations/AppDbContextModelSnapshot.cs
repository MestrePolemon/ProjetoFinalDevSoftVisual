﻿// <auto-generated />
using System;
using F1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace F1.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("F1.Models.Corrida", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("criadoEm")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("dataEvento")
                        .HasColumnType("TEXT");

                    b.Property<string>("nomeEvento")
                        .HasColumnType("TEXT");

                    b.Property<int?>("pistaId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("segundoID")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("terceiroID")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("vencedorID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("voltas")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.HasIndex("pistaId");

                    b.HasIndex("segundoID");

                    b.HasIndex("terceiroID");

                    b.HasIndex("vencedorID");

                    b.ToTable("Corridas");
                });

            modelBuilder.Entity("F1.Models.Equipe", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("criadoEm")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("dataFundacao")
                        .HasColumnType("TEXT");

                    b.Property<string>("nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("paisOrigem")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Equipes");
                });

            modelBuilder.Entity("F1.Models.Piloto", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("criadoEm")
                        .HasColumnType("TEXT");

                    b.Property<int?>("equipeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("nacionalidade")
                        .HasColumnType("TEXT");

                    b.Property<string>("nome")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.HasIndex("equipeId");

                    b.ToTable("Pilotos");
                });

            modelBuilder.Entity("F1.Models.Pista", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("criadoEm")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("dataFundacao")
                        .HasColumnType("TEXT");

                    b.Property<double>("distancia")
                        .HasColumnType("REAL");

                    b.Property<string>("nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("pais")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Pistas");
                });

            modelBuilder.Entity("F1.Models.Torneio", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("EquipeVencedoraID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ano")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("criadoEm")
                        .HasColumnType("TEXT");

                    b.Property<int>("numCorridas")
                        .HasColumnType("INTEGER");

                    b.Property<int>("vencedorID")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.HasIndex("EquipeVencedoraID");

                    b.HasIndex("vencedorID");

                    b.ToTable("Torneios");
                });

            modelBuilder.Entity("F1.Models.Corrida", b =>
                {
                    b.HasOne("F1.Models.Pista", "pista")
                        .WithMany()
                        .HasForeignKey("pistaId");

                    b.HasOne("F1.Models.Piloto", "segundo")
                        .WithMany()
                        .HasForeignKey("segundoID");

                    b.HasOne("F1.Models.Piloto", "terceiro")
                        .WithMany()
                        .HasForeignKey("terceiroID");

                    b.HasOne("F1.Models.Piloto", "vencedor")
                        .WithMany()
                        .HasForeignKey("vencedorID");

                    b.Navigation("pista");

                    b.Navigation("segundo");

                    b.Navigation("terceiro");

                    b.Navigation("vencedor");
                });

            modelBuilder.Entity("F1.Models.Piloto", b =>
                {
                    b.HasOne("F1.Models.Equipe", "equipe")
                        .WithMany()
                        .HasForeignKey("equipeId");

                    b.Navigation("equipe");
                });

            modelBuilder.Entity("F1.Models.Torneio", b =>
                {
                    b.HasOne("F1.Models.Equipe", "EquipeVencedora")
                        .WithMany()
                        .HasForeignKey("EquipeVencedoraID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("F1.Models.Piloto", "vencedor")
                        .WithMany()
                        .HasForeignKey("vencedorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EquipeVencedora");

                    b.Navigation("vencedor");
                });
#pragma warning restore 612, 618
        }
    }
}
