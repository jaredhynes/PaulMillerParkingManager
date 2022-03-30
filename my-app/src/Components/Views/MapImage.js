import {ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger} from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/prototype_map.png";


const MapImage = () => {


    const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
        +
    </ImageTooltipsTrigger>);


    return ( 
    
        <ImageTooltips src={map} width={816} height={544} className="my-image" triggerEvent="click">
            <ImageTooltipsItem top={226} left={280} trigger={MyTrigger} className="my-item">
                <p>Dummy Data:</p>
                <p>Vin: 454345</p>
            </ImageTooltipsItem>
            <ImageTooltipsItem top={300} left={504} trigger={MyTrigger} className="my-item">
                <p>Dummy Data:</p>
                <p>Vin 3454345</p>
            </ImageTooltipsItem>
        </ImageTooltips>
     );
}
 
export default MapImage;