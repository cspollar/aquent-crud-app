package com.aquent.crudapp.company;

import java.util.List;

import org.springframework.stereotype.Repository;

/**
 * Operations on the "company" table.
 */
@Repository
public interface CompanyDao {

    /**
     * Retrieves all of the company records.
     *
     * @return list of company records
     */
    List<Company> listCompanies();

    /**
     * Creates a new company record.
     *
     * @param company the values to save
     * @return the new company ID
     */
    Integer createCompany(Company company);

    /**
     * Retrieves a company record by ID.
     *
     * @param id the company ID
     * @return the company record
     */
    Company readCompany(Integer id);

    /**
     * Updates an existing company record.
     *
     * @param company the new values to save
     */
    void updateCompany(Company company);

    /**
     * Deletes a company record by ID.
     *
     * @param id the company ID
     */
    void deleteCompany(Integer id);
}
