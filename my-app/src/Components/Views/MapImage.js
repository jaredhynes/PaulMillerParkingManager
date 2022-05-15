import { ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger } from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/prototype_map.png";
//import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import '../../Styles/mapimage.css';
import { highlightCar } from "../../functions";
import { MdDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router";


const MapImage = (props) => {
    const navigate = useNavigate()

    function showInfo(car) {
        Swal.fire({
            title: `${car.vin}`,
            html: `<p>Make/Model: ${car.make_model}<p>
                    <p>Location: ${car.spot_name}<p>`,
            showCloseButton: true,
            confirmButtonText: "View Car Details"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/details/${car.vin}`)
            }
        })
    }

    function IconMaker(car, highlightCar) {
        const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
            <Tooltip title={car.spot_name} placement="right">
                <IconButton onClick={() => showInfo(car)}>
                    {highlightCar === car.spot_name ?
                        <MdDirectionsCar className="mapicon" color="red" /> :
                        <MdDirectionsCar className="mapicon" />}
                </IconButton>
            </Tooltip>
        </ImageTooltipsTrigger>);
        return MyTrigger;
    }

    return (
        <ImageTooltips src={map} width={900} height={900} className="my-image" triggerEvent="click">
            {props.carList.map(car => <ImageTooltipsItem top={car.y_val} left={car.x_val} trigger={IconMaker(car, highlightCar)} className="my-item">
            </ImageTooltipsItem>)}
        </ImageTooltips>
    );
}
export default MapImage;