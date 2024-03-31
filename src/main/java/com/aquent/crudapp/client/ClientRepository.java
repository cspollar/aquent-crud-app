package com.aquent.crudapp.client;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends PagingAndSortingRepository<Client, Long>, CrudRepository<Client,Long> { }