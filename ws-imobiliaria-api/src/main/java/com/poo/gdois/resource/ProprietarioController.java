package com.poo.gdois.resource;

import com.poo.gdois.dto.ProprietarioDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(path = "/proprietarios", produces = MediaType.APPLICATION_JSON_VALUE)
public interface ProprietarioController {

    @PostMapping
    ResponseEntity<ProprietarioDto> create(@RequestBody ProprietarioDto dto);

    //TODO: UPDATE DE PROPRIETARIOS

    //TODO: GET BY ID DE PROPRIETARIOS

    @GetMapping
    ResponseEntity<List<ProprietarioDto>> findAll();

}
