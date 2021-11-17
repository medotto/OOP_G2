package com.poo.gdois.resource.impl;

import com.poo.gdois.dto.ProprietarioDto;
import com.poo.gdois.resource.ProprietarioController;
import com.poo.gdois.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProprietarioControllerImpl implements ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;

    @Override
    public ResponseEntity<ProprietarioDto> create(@Valid ProprietarioDto dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(proprietarioService.create(dto));
    }

    @Override
    public ResponseEntity<List<ProprietarioDto>> findAll() {
        return ResponseEntity.ok(proprietarioService.findAll());
    }

}
