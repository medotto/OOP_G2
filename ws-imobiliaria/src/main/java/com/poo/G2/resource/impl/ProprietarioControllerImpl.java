package com.poo.G2.resource.impl;

import com.poo.G2.dto.ProprietarioDto;
import com.poo.G2.resource.ProprietarioController;
import com.poo.G2.service.ProprietarioService;
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
