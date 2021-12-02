package com.poo.gdois.job;

import com.poo.gdois.entity.Imovel;
import com.poo.gdois.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImovelJob {

    @Autowired
    private ImovelRepository imovelRepository;

    @Scheduled(cron = "0 */1 * * * *")
    public void checaImovelInatividade() {
        List<Imovel> imovelList = imovelRepository.findAllHavingNinetyDaysFromLastChange();
        imovelList.forEach(imovel -> imovel.setFlInativo("S"));
        if(!imovelList.isEmpty()) {
            imovelRepository.saveAll(imovelList);
        }
    }

}
