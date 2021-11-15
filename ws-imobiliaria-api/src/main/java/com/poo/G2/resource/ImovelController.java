package com.poo.G2.resource;

import com.poo.G2.dto.ImovelDto;
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

}
