package pw.react.backend.model;

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
    private String longitude;
    @Column
    private String latitude;

    @OneToMany(mappedBy="parkingSpot")
    private transient List<Booking> bookings;
}

