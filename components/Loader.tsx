type Toggle = {
  show: boolean
}
export default function Loader({ show }: Toggle) {
  return show ? <div className="loader"></div> : null;
}