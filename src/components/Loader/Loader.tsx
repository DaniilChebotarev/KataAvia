import { Progress } from "antd";
import classes from './Loader.module.scss';
import { useAppSelector } from "../../hooks/redux";

const Loader = () => {
    const {ticket} = useAppSelector(state => state.ticketReducer);
 

    const loading = (): number => {
        let persents = 0

        for (let i = 0; i < ticket.length; i++) {
            persents = (((i * 100)) / ticket.length)
            
        }

        return Number(persents.toFixed(1));
    }


    
    return (
        <div>
            <Progress className={classes.loader} strokeLinecap="butt" percent={loading()} />
        </div>
    );
};

export default Loader;