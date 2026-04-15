package com.carolmedici.helpdesk.service;

import com.carolmedici.helpdesk.dto.DashboardStatsDTO;
import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository repository;

    public Ticket create(Ticket ticket){
        ticket.setStatus(TicketStatus.OPEN);
        return repository.save(ticket);
    }

    public List<Ticket> getByUser(String userId){
        return repository.findByUserId(userId);
    }

    public Ticket findById(Long id){
        return  repository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket save(Ticket ticket){
        return repository.save(ticket);
    }

    public Ticket updateStatus(Long id, TicketStatus status, String solution, String resolutionType) {
        Ticket ticket = findById(id);
        ticket.setStatus(status);

        if (status == TicketStatus.CLOSED) {
            ticket.setSolution(solution);
            ticket.setResolutionType(resolutionType);
        }
        return repository.save(ticket);
    }

    public List<Ticket> findAll(){
        return repository.findAll();
    }

    public DashboardStatsDTO getAdminStats() {
        return new DashboardStatsDTO(
                repository.count(),
                repository.countByStatus(TicketStatus.OPEN),
                repository.countByStatus(TicketStatus.CLOSED),
                "2.4h" //mock for portfolio use only
        );
    }

    public DashboardStatsDTO getUserStats(String userId) {
        return new DashboardStatsDTO(
                repository.countByUserId(userId),
                repository.countByUserIdAndStatus(userId, TicketStatus.OPEN),
                repository.countByUserIdAndStatus(userId, TicketStatus.CLOSED),
                null
        );
    }
}
