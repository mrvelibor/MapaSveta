package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.common.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyDao extends JpaRepository<Currency, Long> {
    Currency findByCode(String code);
}
