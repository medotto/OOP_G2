package com.poo.gdois.resource.impl;

import com.poo.gdois.dto.ProprietarioDto;
import com.poo.gdois.resource.AbstractController;
import com.poo.gdois.resource.ProprietarioController;
import com.poo.gdois.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProprietarioControllerImpl extends AbstractController implements ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;

    @Override
    public ResponseEntity<ProprietarioDto> create(@Valid ProprietarioDto dto) {
        proprietarioService.create(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @Override
    public ResponseEntity<?> update(ProprietarioDto dto) {
        proprietarioService.update(dto);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<ProprietarioDto> findOneById(Long id) {
        return buildSuccessOrNoContentResponse(proprietarioService.findOneById(id));
    }

    @Override
    public ResponseEntity<List<ProprietarioDto>> findAll() {
        return ResponseEntity.ok(proprietarioService.findAll());
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        proprietarioService.delete(id);
        return ResponseEntity.ok().build();
    }

}
