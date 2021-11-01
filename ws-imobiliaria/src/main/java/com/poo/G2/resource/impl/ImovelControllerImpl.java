package com.poo.G2.resource.impl;

import com.poo.G2.dto.ImovelDto;
import com.poo.G2.resource.AbstractController;
import com.poo.G2.resource.ImovelController;
import com.poo.G2.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ImovelControllerImpl extends AbstractController implements ImovelController {

    @Autowired
    private ImovelService imovelService;

    @Override
    public ResponseEntity<ImovelDto> create(@Valid ImovelDto dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(imovelService.create(dto));
    }

    @Override
    public ResponseEntity<List<ImovelDto>> findAll() {
        return ResponseEntity.ok(imovelService.findAll());
    }

    @Override
    public ResponseEntity<ImovelDto> findById(Long id) {
        var imovel = imovelService.findById(id);
        return buildSuccessOrNoContentResponse(imovel);
    }

}
