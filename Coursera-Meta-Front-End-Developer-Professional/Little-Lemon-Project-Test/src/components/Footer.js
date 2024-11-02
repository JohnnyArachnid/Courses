import footerPhoto from "../icons/footer.jpg"

function Footer() {
    return (<footer>
        <div>
            <p>Little Lemon • © 2024</p>
        </div>
        <div className="footer-img">
            <a href="./">
                <img src={footerPhoto} alt="Footer Logo"/>
            </a>
        </div>
    </footer>
    );
}


export default Footer;