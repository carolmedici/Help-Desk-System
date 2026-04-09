package com.carolmedici.helpdesk.entity;

import com.carolmedici.helpdesk.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long Id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    private String userId;

}
