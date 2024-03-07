import React from "react";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { BiBookContent } from "react-icons/bi";

const AboutUs = () => {
  return (
    <>
      {/* <Navbar />  */}
      <div className="main-aboutUs-div">
        <div className="aboutUs-main">
          <h4 className="aboutUs-first-heading">
            Your favourite online bookstore!
          </h4>

          <p>
            At Pustakgriha, we embody everything you love about books. Our
            mission is to share the power of books and we connect books with
            people by making discovering and buying books easy, entertaining,
            informative, and socially engaging. Discover new books, browse and
            buy books online at the lowest everyday prices.
          </p>

          <h4>Nepal's Largest Online Bookstore</h4>
          <p>
            <strong>
              We offer more than 35K different titles for immediate delivery to
              most places in Nepal and worldwide -- that's more titles than any
              other online booksellers.
            </strong>
          </p>

          <p>
            While the concept started with #bookstagramming the lofty collection
            at the book shop, Pustakgriha has come a long way and now, we mean
            different things for different people. For our team, the aim is to
            create the largest community of book readers in Nepal. It is about
            helping to foster the love of reading and supporting new authors and
            fellow-readers from all corners of the globe because we believe that
            books have the power to transform the world around us. For our
            customers, we have tried to make Pustakgriha the ultimate
            destination for book lovers by offering an array of book related
            content. With so many titles, it is vital to give customers an easy
            way to find precisely the books they are looking for.
          </p>

          <p>
            Our search engine enables customers to locate books by title,
            author, or keyword in a few seconds at most. Customers with a
            general idea of what they browse pages through different categories
            to find exactly the right book. To further assist users, we offer
            descriptions, restock alerts for books that are out of stock and
            book requests as well as pre-order for books that are not available
            with us. It's also easy to stock shelves from the comforts of home
            through our safe delivery system. We deliver to major cities of
            Nepal and overseas.
          </p>
        </div>

        <h2>Our Services</h2>
        <div className="main-ourServices">
          <div className="service-icon">
            <BiBookContent />
          </div>
          <div>
            <h5>Buy Books Online</h5>
            <p>
              Easily discover new reads and stock your shelves at the comforts
              of your home through our safe delivery system. We deliver
              worldwide and to all districts in Nepal.
            </p>
          </div>
        </div>

        <div className="main-ourServices">
          <div className="service-icon">
            <RiCompassDiscoverLine />
          </div>
          <div>
            <h5>Discover new books and people</h5>
            <p>
              Follow us at our socials to find book recommendations, discussion
              and more. We also have a community on Discord where bibliophiles
              can come together to talk about and share some of their favorite
              things: books.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
