import { useSelector, useDispatch } from "react-redux";
import { addItem } from '../../redux/action/news.action';

function News() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  dispatch(addItem());
  return (
    <div className="news">
      Top news will go here
    </div>
  );
}

export default News;
