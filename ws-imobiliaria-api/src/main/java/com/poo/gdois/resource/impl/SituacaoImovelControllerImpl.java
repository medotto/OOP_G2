package com.poo.gdois.resource.impl;

import com.poo.gdois.dto.SituacaoImovelDto;
import com.poo.gdois.resource.AbstractController;
import com.poo.gdois.resource.SituacaoImovelController;
import com.poo.gdois.service.SituacaoImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SituacaoImovelControllerImpl extends AbstractController implements SituacaoImovelController {

    @Autowired
    private SituacaoImovelService situacaoImovelService;

    @Override
    public ResponseEntity<List<SituacaoImovelDto>> findAll() {
        return ResponseEntity.ok(situacaoImovelService.findAll());
    }

}
