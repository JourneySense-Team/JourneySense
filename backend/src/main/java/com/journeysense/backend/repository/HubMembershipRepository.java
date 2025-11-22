package com.journeysense.backend.repository;

import com.journeysense.backend.model.HubMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HubMembershipRepository extends JpaRepository<HubMembership, UUID> {
}
