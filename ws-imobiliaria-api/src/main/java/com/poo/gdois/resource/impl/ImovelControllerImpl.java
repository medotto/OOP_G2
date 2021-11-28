package com.poo.gdois.resource.impl;

import com.poo.gdois.dto.ImovelDto;
import com.poo.gdois.resource.AbstractController;
import com.poo.gdois.resource.ImovelController;
import com.poo.gdois.service.ImovelService;
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
    public ResponseEntity<?> create(@Valid ImovelDto dto) {
        imovelService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<?> update(ImovelDto dto) {
        imovelService.update(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
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

    @Override
    public ResponseEntity<?> delete(Long id) {
        imovelService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<ImovelDto>> findAllByOwner(String owner) {
        var imovelList = imovelService.findAllByOwner(owner);
        return buildSuccessOrNoContentResponse(imovelList);
    }

}
