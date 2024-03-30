package com.aquent.crudapp.company;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller for handling basic company management operations.
 */
@Controller
@RequestMapping("company")
public class CompanyController {

    public static final String COMMAND_DELETE = "Delete";

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    /**
     * Renders the listing page.
     *
     * @return list view populated with the current list of companies
     */
    @GetMapping(value = "list")
    public ModelAndView list() {
        ModelAndView mav = new ModelAndView("company/list");
        mav.addObject("companies", companyService.listCompanies());
        return mav;
    }

    /**
     * Renders an empty form used to create a new company record.
     *
     * @return create view populated with an empty company
     */
    @GetMapping(value = "create")
    public ModelAndView create() {
        ModelAndView mav = new ModelAndView("company/create");
        mav.addObject("company", new Company());
        mav.addObject("errors", new ArrayList<String>());
        return mav;
    }

    /**
     * Validates and saves a new company.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param company populated form bean for the company
     * @return redirect, or create view with errors
     */
    @PostMapping(value = "create")
    public ModelAndView create(Company company) {
        List<String> errors = companyService.validateCompany(company);
        if (errors.isEmpty()) {
            companyService.createCompany(company);
            return new ModelAndView("redirect:/company/list");
        } else {
            ModelAndView mav = new ModelAndView("company/create");
            mav.addObject("company", company);
            mav.addObject("errors", errors);
            return mav;
        }
    }

    /**
     * Renders an edit form for an existing company record.
     *
     * @param companyId the ID of the company to edit
     * @return edit view populated from the company record
     */
    @GetMapping(value = "edit/{companyId}")
    public ModelAndView edit(@PathVariable Integer companyId) {
        ModelAndView mav = new ModelAndView("company/edit");
        mav.addObject("company", companyService.readCompany(companyId));
        mav.addObject("errors", new ArrayList<String>());
        return mav;
    }

    /**
     * Validates and saves an edited company.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param company populated form bean for the company
     * @return redirect, or edit view with errors
     */
    @PostMapping(value = "edit")
    public ModelAndView edit(Company company) {
        List<String> errors = companyService.validateCompany(company);
        if (errors.isEmpty()) {
            companyService.updateCompany(company);
            return new ModelAndView("redirect:/company/list");
        } else {
            ModelAndView mav = new ModelAndView("company/edit");
            mav.addObject("company", company);
            mav.addObject("errors", errors);
            return mav;
        }
    }

    /**
     * Renders the deletion confirmation page.
     *
     * @param companyId the ID of the company to be deleted
     * @return delete view populated from the company record
     */
    @GetMapping(value = "delete/{companyId}")
    public ModelAndView delete(@PathVariable Integer companyId) {
        ModelAndView mav = new ModelAndView("company/delete");
        mav.addObject("company", companyService.readCompany(companyId));
        return mav;
    }

    /**
     * Handles company deletion or cancellation, redirecting to the listing page in either case.
     *
     * @param command the command field from the form
     * @param companyId the ID of the company to be deleted
     * @return redirect to the listing page
     */
    @PostMapping(value = "delete")
    public String delete(@RequestParam String command, @RequestParam Integer companyId) {
        if (COMMAND_DELETE.equals(command)) {
            companyService.deleteCompany(companyId);
        }
        return "redirect:/company/list";
    }
}
