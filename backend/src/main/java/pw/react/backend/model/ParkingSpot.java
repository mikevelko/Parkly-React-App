package pw.react.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "parking_spot")
@Getter
@Setter
public class ParkingSpot implements Serializable {
    public static ParkingSpot EMPTY = new ParkingSpot();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String name;

    //adres, możliwe że warto zrobić oddzielny typ
    @Column
    private String city;
    @Column
    private String street;
    @Column
    private String startDateTime;
    @Column
    private String endDateTime;
    @Column
    private boolean active;
    @Column
    private String longitude;
    @Column
    private String latitude;
    @Column
    private boolean booked;

    @OneToMany(mappedBy="item", fetch = FetchType.LAZY)
    private List<Booking> bookings;
}

