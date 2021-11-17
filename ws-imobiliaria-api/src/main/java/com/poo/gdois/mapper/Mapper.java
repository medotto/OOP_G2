package com.poo.gdois.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class Mapper<D, E> {

    @Autowired
    private ModelMapper modelMapper;

    public D mapToDto(E entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public E mapToEntity(D dto, Class<E> entityClass) {
        return modelMapper.map(dto, entityClass);
    }

    public List<D> mapToDtoList(List<E> entityList, Class<D> dtoClass) {
        return entityList.stream()
                .map(element -> modelMapper.map(element, dtoClass))
                .collect(Collectors.toList());
    }

    public List<E> mapToEntityList(List<D> dtoList, Class<E> entityClass) {
        return dtoList.stream()
                .map(element -> modelMapper.map(element, entityClass))
                .collect(Collectors.toList());
    }

}
