package pw.react.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import pw.react.backend.utils.DateTimeFormat;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Getter
@Setter
public class Booking implements Serializable {

    public static Booking EMPTY = new Booking();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @Column
    private long ownerId;

    @Column
    private boolean Active;

    @Column(name = "start_date")
    @JsonFormat(pattern= DateTimeFormat.DATE_FORMAT)
    private LocalDateTime startDateTime;

    @Column(name = "end_date")
    @JsonFormat(pattern= DateTimeFormat.DATE_FORMAT)
    private LocalDateTime endDateTime;

    @Column
    private String ItemType;

    @ManyToOne
    @JoinColumn(name="item_id", nullable = false)
    @JsonIgnoreProperties("bookings")
    private ParkingSpot item;

    private transient long itemId;
}
