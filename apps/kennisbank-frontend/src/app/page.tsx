import Link from 'next/link';
import {
  FiInfo,
  FiEdit,
  FiFileText,
  FiList,
  FiAlertTriangle,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiMenu,
  FiPhone,
} from 'react-icons/fi';

import { GET_HOME_PAGE } from '@/queries/graphql';
import { fetchData, strapiURL } from '@/utils';

export const dynamic = 'force-dynamic';

interface HomePageData {
  data: {
    homePage: {
      title: string;
    };
  };
}

const Home = async () => {
  const { data } = await fetchData<HomePageData>({
    url: strapiURL,
    query: GET_HOME_PAGE,
    headers: {
      Authorization: `Bearer ${process.env.KENNISBANK_API_TOKEN}`,
    },
  });

  return (
    <div>
      <main>
        <h1>{data?.homePage?.title}</h1>

        <section>
          <ul>
            <li>
              <article>
                <FiInfo />
                <h3>Introductie</h3>
                <p>Basisinformatie over het proces.</p>
              </article>
            </li>
            <li>
              <article>
                <FiEdit />
                <h3>Aanvraag</h3>
                <p>Hoe dien je een aanvraag in?</p>
              </article>
            </li>
            <li>
              <article>
                <FiFileText />
                <h3>Bewijsstukken</h3>
                <p>Welke documenten heb je nodig?</p>
              </article>
            </li>
            <li>
              <article>
                <FiList />
                <h3>Voorwaarden</h3>
                <p>Wat zijn de voorwaarden van je aanvraag?</p>
              </article>
            </li>
            <li>
              <article>
                <FiAlertTriangle />
                <h3>Bezwaar</h3>
                <p>Hoe maak je bezwaar tegen een beslissing?</p>
              </article>
            </li>
            <li>
              <article>
                <FiDollarSign />
                <h3>Kosten</h3>
                <p>Wat zijn de kosten en wanneer betaal je?</p>
              </article>
            </li>
            <li>
              <article>
                <FiCalendar />
                <h3>Termijnen</h3>
                <p>Wanneer moet je actie ondernemen?</p>
              </article>
            </li>
            <li>
              <article>
                <FiClock />
                <h3>Geen reactie</h3>
                <p>Wat kun je doen als je niets hoort?</p>
              </article>
            </li>
            <li>
              <article>
                <FiMenu />
                <h3>Details</h3>
                <p>Extra achtergrondinformatie of toelichting.</p>
              </article>
            </li>
            <li>
              <article>
                <FiPhone />
                <h3>Contact</h3>
                <p>Waar kun je terecht met vragen of hulp?</p>
              </article>
            </li>
          </ul>
        </section>

        <div>
          <Link href="/kennisartikelen">📚 Bekijk alle kennisartikelen</Link>
        </div>
      </main>
    </div>
  );
};
export default Home;
