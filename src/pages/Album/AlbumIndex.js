import { useOutletContext } from 'react-router-dom';
export default function AlbumIndex() {
  const list = useOutletContext();
  return (
    <div>
      相簿首頁
      {list.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.urls.small} alt={item.alt_description} />
          </div>
        );
      })}
    </div>
  );
}
