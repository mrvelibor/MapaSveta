package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.common.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageDao extends JpaRepository<Language, Long> {
    Language findByCode(String code);
}
