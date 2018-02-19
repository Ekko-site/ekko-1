const handleMapClick = event => {
    event.target.querySelector('iframe').style.pointerEvents = 'auto'
}
const map = document.getElementById('map')
map && map.addEventListener('click', handleMapClick)
