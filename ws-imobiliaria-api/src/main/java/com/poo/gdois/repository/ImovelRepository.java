package com.poo.gdois.repository;

import com.poo.gdois.entity.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImovelRepository extends JpaRepository<Imovel, Long> {
}
