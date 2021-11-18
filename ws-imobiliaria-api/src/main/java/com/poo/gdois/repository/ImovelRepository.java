package com.poo.gdois.repository;

import com.poo.gdois.entity.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImovelRepository extends JpaRepository<Imovel, Long> {

    @Query(value = "select * from imovel " +
            "where fl_inativo != 'S' and ((dt_cadastro <= (NOW() - INTERVAL 4 DAY) and dt_alteracao is null) " +
            "or (dt_alteracao <= (NOW() - INTERVAL 4 DAY)))", nativeQuery = true)
    List<Imovel> findAllHavingNinetyDaysFromLastChange();

}
