import { ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger } from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/prototype_map.png";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import{GiCityCar} from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import '../../Styles/mapimage.css'

const MapImage = (props) => {

    const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
        <DirectionsCarIcon fontSize="large"/>
        +
    </ImageTooltipsTrigger>);

    const Trigger2 = (<ImageTooltipsTrigger className="trigger2">
    {/* <DirectionsCarIcon fontSize="large"/> */}
    +
    </ImageTooltipsTrigger>);


    return (
        <ImageTooltips src={map} width={900} height={900} className="my-image" triggerEvent="click">
        {props.carList.map(car => <ImageTooltipsItem top={car.y_val} left={car.x_val} trigger={MyTrigger} className="my-item">
        <p>{car.make_model}</p>
        <p>Vin: {car.vin}</p>
        </ImageTooltipsItem>) } 
        </ImageTooltips>
    );
}
export default MapImage;