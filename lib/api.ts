const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }
  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getWishList() {
  const data = await fetchAPI(`
    query WishList {
      getWishList {
        productIds
      }
    }
  `);
  return data?.getWishList;
}

export async function getUser() {
  const data = await fetchAPI(`
    query Viewer {
      viewer {
        avatar(size: 400) {
          url
        }
        id
        databaseId
        firstName
        lastName
        email
        description
        capabilities
        name
        kundnummer {
          catell
          juzo
          medema
          mediqSverige
          onemedSverige
        }
      }
    }
  `);
  return data?.viewer;
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
  );

  return data?.posts;
}

export async function getAllAvtal() {
  const data = await fetchAPI(`
    query Avtal {
      products(where: {orderby: {field: MENU_ORDER, order: ASC}}, first: 10000) {
        edges {
          node {
            date
            excerpt
            content
            id
            productId
            title
            slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            productCategories {
              edges {
                node {
                  id
                  name
                }
              }
            }
            productTags {
              edges {
                node {
                  id
                  name
                }
              }
            }
            avtalstyp {
              valjkund {
                id
              }
              leverantor {
                ... on Leverantorer {
                  title
                }
              }
            }
            sok {
              sokord
            }
          }
        }
      }
    }
  `);
  return data?.products;
}

export async function getAllRapporter() {
  const data = await fetchAPI(`
    query Rapporter {
      allRapporter(first: 10000) {
        edges {
          node {
            file {
              pdf {
                fileSize
                mediaItemUrl
                title
              }
            }
            title
            id
            rapportUser {
              kopplaRapport {
                id
                name
                email
              }
            }
          }
        }
      }
    }
  `);
  return data?.allRapporter;
}

export async function getAllLeverantorer() {
  const data = await fetchAPI(`
    query Leverantorer {
      allLeverantorer(first: 10000) {
        edges {
          node {
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            productCategories {
              edges {
                node {
                  id
                  name
                }
              }
            }
            id
            title
            content
            slug
          }
        }
      }
    }
  `);
  return data?.allLeverantorer;
}

export async function getLeverantor(slug) {
  const data = await fetchAPI(`
    {
      leverantorer(id: "${slug}", idType: URI) {
        title
        content
        uri
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `);
  return data?.leverantorer;
}

export async function getAvtal(slug) {
  const data = await fetchAPI(`
    {
      product(id: "${slug}", idType: SLUG) {
        title
        content
        uri
        slug
        productId
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        productCategories {
          edges {
            node {
              id
              name
            }
          }
        }
        file {
          pdf {
            mediaItemUrl
            title
            fileSize
          }
        }
        avtalsinfo {
          adress
          hemsida
          kontaktpersonEmail
          kontaktpersonNamn
          kontaktpersonRoll
          kontaktpersonTelefonnummer
          kundtjanstEmail
          kundtjanstTelefonnummer
          namn
          orderEmail
          webbshop
          avtalsbild {
            sourceUrl
          }
        }
      }
    }
  `);
  return data?.product;
}

export async function getIndex() {
  const data = await fetchAPI(`
    {
      redigera(id: "cG9zdDo0MTI=") {
        id
        redigera {
          heroText
          heroRubrik
          heroBild {
            sourceUrl
            mediaItemUrl
            mediaType
          }
        }
        landingSection {
          omossRubrik
          omossText
          omossBild {
            sourceUrl
          }
          rapporterRubrik
          rapporterText
          rapporterBild {
            sourceUrl
          }
        }
      }
    }
  `);
  return data?.redigera;
}

export async function getHeroAvtal() {
  const data = await fetchAPI(`
    {
      redigera(id: "cG9zdDo0MTY=") {
        id
        redigera {
          heroRubrik
          heroBild {
            sourceUrl
            mediaItemUrl
            mediaType
          }
        }
      }
    }
  `);
  return data?.redigera;
}

export async function getHeroLeverantor() {
  const data = await fetchAPI(`
    {
      redigera(id: "cG9zdDo0MTQ=") {
        id
        redigera {
          heroRubrik
          heroBild {
            sourceUrl
            mediaItemUrl
            mediaType
          }
        }
      }
    }
  `);
  return data?.redigera;
}

export async function getHeroRapporter() {
  const data = await fetchAPI(`
    {
      redigera(id: "cG9zdDo0MTM=") {
        id
        redigera {
          heroText
          heroRubrik
          heroBild {
            sourceUrl
            mediaItemUrl
            mediaType
          }
        }
      }
    }
  `);
  return data?.redigera;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export async function getPrimaryMenu() {
  const data = await fetchAPI(`
  {
    menus(where: {location: PRIMARY}) {
      nodes {
        menuItems {
          edges {
            node {
              path
              label
              connectedNode {
                node {
                  ... on Page {
                    isPostsPage
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `);
  return data?.menus?.nodes[0];
}

export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getPageBySlug(slug) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
      uri
    }
  }
  `);
  return data?.page;
}

export async function getAllRedigera() {
  const data = await fetchAPI(`
    query Redigera {
      allRedigera {
        edges {
          node {
            redigera {
              heroBild {
                sourceUrl
              }
              heroRubrik
              heroText
            }
          }
        }
      }
    }
  `);
  return data?.allRedigera;
}

export async function getKundNummer() {
  const data = await fetchAPI(`
  query Kundnummer {
    viewer {
      kundnummer {
        catell
        juzo
        medema
        mediqSverige
      }
    }
  }
  `);
  return data?.viewer;
}

export async function getCategories() {
  const data = await fetchAPI(`
    query Categories {
      productCategories(first: 10000) {
        edges {
          node {
            name
            count
            id
          }
        }
      }
    }
  `);
  return data?.productCategories;
}
