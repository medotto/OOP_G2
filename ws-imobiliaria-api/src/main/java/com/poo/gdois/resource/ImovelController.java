package com.poo.gdois.resource;

import com.poo.gdois.dto.ImovelDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/imoveis", produces = MediaType.APPLICATION_JSON_VALUE)
public interface ImovelController {

    @PostMapping
    ResponseEntity<?> create(@RequestBody ImovelDto dto);

    @PutMapping
    ResponseEntity<?> update(@RequestBody ImovelDto dto);

    @GetMapping
    ResponseEntity<List<ImovelDto>> findAll();

    @GetMapping(path = "/{id}")
    ResponseEntity<ImovelDto> findById(@PathVariable Long id);

    @DeleteMapping(path = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);

    //TODO: JOB PRA DIZER SE TA ATIVO OU NAO

}
