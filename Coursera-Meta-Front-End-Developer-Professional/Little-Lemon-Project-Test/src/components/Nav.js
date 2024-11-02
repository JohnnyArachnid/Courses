function Nav({data}) {
    return (<nav>
    {data.map((social, index) => {
      return (
        <p key={index}>
          <a href={social.url}>
            <img
              src={social.icon}
              alt={`icon-${index}`
              }
            />
          </a>
        </p>
      );
    })}
  </nav>
  );
}


export default Nav;