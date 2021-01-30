package pw.react.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
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
    public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @Enumerated(EnumType.ORDINAL)
    private BookingState bookingState;

    @Column(name = "start_date")
    @JsonFormat(pattern=Booking.DATE_FORMAT)
    private LocalDateTime startDateTime;

    @Column(name = "end_date")
    @JsonFormat(pattern=Booking.DATE_FORMAT)
    private LocalDateTime endDateTime;

    @ManyToOne
    @JoinColumn(name="parking_spot_id", nullable = false)
    @JsonIgnoreProperties("bookings")
    private ParkingSpot parkingSpot;

    private transient long parkingSpotId;
}
