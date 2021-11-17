package com.poo.gdois.resource;

import com.poo.gdois.dto.ProprietarioDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/proprietarios", produces = MediaType.APPLICATION_JSON_VALUE)
public interface ProprietarioController {

    @PostMapping
    ResponseEntity<ProprietarioDto> create(@RequestBody ProprietarioDto dto);

    @PutMapping
    ResponseEntity<?> update(@RequestBody ProprietarioDto dto);

    @GetMapping(path = "/{id}")
    ResponseEntity<ProprietarioDto> findOneById(@PathVariable Long id);

    @GetMapping
    ResponseEntity<List<ProprietarioDto>> findAll();

}
