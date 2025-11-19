import { test, expect } from 'vitest'
import { TinyBibReader, TinyBibFormatter } from './main.js'

const bib2citeAPA = [
  {
    bib: '@misc{dmr, author = "Ramík, Dominik M.", title = "Personal observations and unpublished field data", year = "s.n." }',
    apa: 'Ramík, D. M. (s.n.). Personal observations and unpublished field data.'
  },
  {
    bib: '@book{Zug2013, title = "Reptiles and amphibians of the Pacific islands", author = "Zug, George R", publisher = "University of California Press", month = jul, year = 2013, address = "Berkeley, CA"}',
    apa: 'Zug, G. R. (2013). Reptiles and amphibians of the Pacific islands. University of California Press.'
  },
  {
    bib: '@book{Lavery2023, title = "Mammals of the South-west Pacific", author = "Lavery, Tyrone H. and Flannery, Tim F.", publisher = "CSIRO Publishing", year = 2023 }',
    apa: 'Lavery, T. H., & Flannery, T. F. (2023). Mammals of the South-west Pacific. CSIRO Publishing.'
  },
  {
    bib: '@article{saunders1869, title = {Descriptions of ten new Species of the Genus Paracupta, H. Deyrolle, and of ten new Species of the Genus Conognatha, Escholtze}, journal = {The Journal of the Linnean Society of London. Zoology}, volume = {10}, copyright = {Public domain. The BHL considers that this work is no longer under copyright protection.}, url = {https://www.biodiversitylibrary.org/part/376873}, publisher = {London, Academic Press [etc.], 1865-1968}, author = {Saunders, Edward}, year = {1869}, pages = {331--341}, }',
    apa: 'Saunders, E. (1869). Descriptions of ten new Species of the Genus Paracupta, H. Deyrolle, and of ten new Species of the Genus Conognatha, Escholtze. The Journal of the Linnean Society of London. Zoology, 10, 331–341.'
  },
  {
    bib: '@ARTICLE{Grady2019-dn, title = {Emotions in storybooks: {A} comparison of storybooks that represent ethnic and racial groups in the United States}, author = "Grady, Jessica Stoltzfus and Her, Malina and Moreno, Geena and Perez, Catherine and Yelinek, Jillian", journal = "Psychol. Pop. Media Cult.", publisher = "American Psychological Association (APA)", volume = 8, number = 3, pages = "207--217", month = jul, year = 2019, language = "en", doi ="https://doi.org/10.1037/ppm0000185"}',
    apa: 'Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J. (2019). Emotions in storybooks: A comparison of storybooks that represent ethnic and racial groups in the United States. Psychol. Pop. Media Cult., 8(3), 207–217. https://doi.org/10.1037/ppm0000185'
  },
  {
    bib: '@ARTICLE{Jerrentrup2018-xl, title = "Teaching medicine with the help of “Dr. House”", author = "Jerrentrup, Andreas and Mueller, Tobias and Glowalla, Ulrich and Herder, Meike and Henrichs, Nadine and Neubauer, Andreas and Schaefer, Juergen R", journal = "PLoS ONE", publisher = "Public Library of Science (PLoS)", volume = 13, number = 3, month = mar, year = 2018, copyright = "http://creativecommons.org/licenses/by/4.0/", language = "en", doi = "https://doi.org/10.1371/journal.pone.0193972" } ',
    apa: 'Jerrentrup, A., Mueller, T., Glowalla, U., Herder, M., Henrichs, N., Neubauer, A., & Schaefer, J. R. (2018). Teaching medicine with the help of “Dr. House”. PLoS ONE, 13(3). https://doi.org/10.1371/journal.pone.0193972'
  },
  {
    bib: '@ARTICLE{Sanchiz2017-cf, title = "How do older and young adults start searching for information? Impact of age, domain knowledge and problem complexity on the different steps of information searching", author = "Sanchiz, M and Chevalier, A and Amadieu, F", abstract = "The present study addressed the age-related differences in query production and information searching performance when interacting with a search engine. To this end, 20 older adults and 20 young ones performed 12 information search problems of varying complexity in two knowledge domains (health and fantastic movies). Participants had simple (useful keywords provided and answer directly accessible in Google), inferential (inferences to produce useful keywords required) and multicriteria problems (information gathering and navigation required). Results showed that older adults produced their first query with more keywords extracted from the search problem statements and spent more time on the search engine pages than young ones. In the fantastic movies, older adults struggled more than young ones and had difficulties reformulating their queries (i.e. fewer new keywords produced, more statement provided keywords). Older adults especially struggled at the beginning of the search (more time spent on the first search engine result page than young ones and they produced less elaborate initial query). In contrast, in the health domain, higher prior knowledge helped older users reformulate queries that were more elaborated (i.e.no age-related differences on the number of new keywords) and improved the processing of the first search engine page consulted.", journal = "Comput. Human Behav.", publisher = "Elsevier BV", volume = 72, pages = "67--78", month = jul, year = 2017, doi = "https://doi.org/10.1016/j.chb.2017.02.038" } ',
    apa: 'Sanchiz, M., Chevalier, A., & Amadieu, F. (2017). How do older and young adults start searching for information? Impact of age, domain knowledge and problem complexity on the different steps of information searching. Comput. Human Behav., 72, 67–78. https://doi.org/10.1016/j.chb.2017.02.038'
  },
  {
    bib: '@ARTICLE{Butler2017-az, title = "Where access meets multimodality: The case of {ASL} music videos", author = "Butler, J", journal = "Kairos: A Journal of Rhetoric, Technology, and Pedagogy", volume = 21, number = 1, year = 2017 } ',
    apa: 'Butler, J. (2017). Where access meets multimodality: The case of ASL music videos. Kairos: A Journal of Rhetoric, Technology, and Pedagogy, 21(1).'
  },
  {
    bib: '@ARTICLE{Ganster1991-kg, title = "The nomological validity of the Type A personality among employed adults", author = "Ganster, Daniel C and Schaubroeck, John and Sime, Wesley E and Mayes, Bronston T", journal = "J. Appl. Psychol.", publisher = "American Psychological Association (APA)", volume = 76, number = 1, pages = "143--168", month = feb, year = 1991, language = "en", doi = "http://doi.org/10.1037/0021-9010.76.1.143" } ',
    apa: 'Ganster, D. C., Schaubroeck, J., Sime, W. E., & Mayes, B. T. (1991). The nomological validity of the Type A personality among employed adults. J. Appl. Psychol., 76(1), 143–168. http://doi.org/10.1037/0021-9010.76.1.143'
  },
  {
    bib: '@BOOK{Jackson2019-qc, title = "The psychology of prejudice: From attitudes to social action (2nd ed.)", author = "Jackson, Lynne M", publisher = "American Psychological Association", edition = 2, month = dec, year = 2019, address = "Washington, D.C., DC", language = "en", doi = "https://doi.org/10.1037/0000168-000" } ',
    apa: 'Jackson, L. M. (2019). The psychology of prejudice: From attitudes to social action (2nd ed.). American Psychological Association. https://doi.org/10.1037/0000168-000'
  },
  {
    bib: '@INCOLLECTION{Aron2019-qq, title = "Culinary arts: Talent and their development", booktitle = "Psychology of high performance: Developing human potential into domain-specific talent", author = "Aron, Laurent and Botella, Marion and Lubart, Todd", editor = "Aron, L. and Botella, M. and Lubart, T.", publisher = "American Psychological Association", pages = "345--359", year = 2019, address = "Washington", doi = "https://doi.org/10.1037/0000120-016" }',
    apa: 'Aron, L., Botella, M., & Lubart, T. (2019). Culinary arts: Talent and their development. Aron, L., Botella, M., & Lubart, T. (Eds.), Psychology of high performance: Developing human potential into domain-specific talent, 345–359. American Psychological Association. https://doi.org/10.1037/0000120-016'
  },
  {
    bib: '@ARTICLE{Duckworth2019-ql, title = "Cognitive and noncognitive predictors of success", author = "Duckworth, Angela L and Quirk, Abigail and Gallop, Robert and Hoyle, Rick H and Kelly, Dennis R and Matthews, Michael D", abstract = "When predicting success, how important are personal attributes other than cognitive ability? To address this question, we capitalized on a full decade of prospective, longitudinal data from n = 11,258 cadets entering training at the US Military Academy at West Point. Prior to training, cognitive ability was negatively correlated with both physical ability and grit. Cognitive ability emerged as the strongest predictor of academic and military grades, but noncognitive attributes were more prognostic of other achievement outcomes, including successful completion of initiation training and 4-y graduation. We conclude that noncognitive aspects of human capital deserve greater attention from both scientists and practitioners interested in predicting real-world success.", journal = "Proc. Natl. Acad. Sci. U. S. A.", publisher = "Proceedings of the National Academy of Sciences", volume = 116, number = 47, pages = "23499--23504", month = nov, year = 2019, keywords = "achievement; cognitive ability; graduation; grit; military", copyright = "https://creativecommons.org/licenses/by-nc-nd/4.0/", language = "en", doi = "https://doi.org/10.1073/pnas.1910510116" } ',
    apa: 'Duckworth, A. L., Quirk, A., Gallop, R., Hoyle, R. H., Kelly, D. R., & Matthews, M. D. (2019). Cognitive and noncognitive predictors of success. Proc. Natl. Acad. Sci. U. S. A., 116(47), 23499–23504. https://doi.org/10.1073/pnas.1910510116'
  },
  {
    bib: '@BOOK{Kushilevitz2015-nr, title = "Theory of cryptography", editor = "Kushilevitz, Eyal and Malkin, Tal", publisher = "Springer", series = "Lecture notes in computer science: Vol. 9562", edition = 1, month = dec, year = 2015, address = "Berlin, Germany", language = "en", doi = "https://doi.org/10.1007/978-3-662-49096-9" } ',
    apa: 'Kushilevitz, E., & Malkin, T. (Eds.). (2015). Lecture notes in computer science: Vol. 9562. Theory of cryptography. Springer. https://doi.org/10.1007/978-3-662-49096-9'
  },
  {
    bib: '@INCOLLECTION{Bedenel2019-vg, title = "Probability estimation by an adapted genetic algorithm in web insurance", booktitle = "Lecture Notes in Computer Science", author = "Bedenel, Anne-Lise and Jourdan, Laetitia and Biernacki, Christophe", publisher = "Springer International Publishing", pages = "225--240", series = "Lecture notes in computer science", year = 2019, address = {C{h}am}, copyright = "https://www.springernature.com/gp/researchers/text-and-data-mining", doi = "https://doi.org/10.1007/978-3-030-05348-2_21" } ',
    apa: 'Bedenel, A., Jourdan, L., & Biernacki, C. (2019). Lecture notes in computer science. Probability estimation by an adapted genetic algorithm in web insurance, Lecture Notes in Computer Science, 225–240. Springer International Publishing. https://doi.org/10.1007/978-3-030-05348-2_21'
  },
]

test('reads bibtex gracefully', () => {
  for (const item of bib2citeAPA) {
    const reader = new TinyBibReader(item.bib)
    expect(reader.citeKeys.length).toEqual(1)
  }

  const biblio = `@article{Achille2006,
  author = "Achille, F.",
  year = {2006},
  title = {Tinadendron, nouveau genre de Rubiaceae, Guettardeae de Mélanésie orientale},
  journal = {Adansonia, sér},
  volume = 3,
  number = {28},
  pages = "167-180",
    }

  % Adelbert, A.G.L.  1948.  Notes on the Flora of Java, IV.  Blumea 6: 310–336.
  @article{Adelbert1948,
  author = {Adelbert, A. G. L.},
  year = {1948},
  title = {Notes on the Flora of Java, IV},
  journal = {Blumea},
  volume = {6},
  pages = {310-336}
  }

  % Adema, F., P.W. Leenhouts, P.C. van Welzen.  1994.  Sapindaceae.  Flora Malesiana. Series I, Spermatophyta: Flowering Plants. 11(3): 419–768.
  @book{AdemaLeenhoutsWelzen1994,
  author = {Adema, F. and P. W. Leenhouts and P. C. van Welzen},
  year = {1994},
  title = {Sapindaceae. Flora Malesiana},
  series = {Series I},
  publisher = {Spermatophyta: Flowering Plants. 11(3): 419--768},
  }

  % Adema, F.  1993.  Elattostachys (Blume) Radlk. (Sapindaceae) in Fiji.  Pacific Science 47: 295–297.
  @article{Adema1993,
  author = {Adema, F.},
  year = {1993},
  title = {Elattostachys (Blume) Radlk},
  journal = {Sapindaceae) in Fiji. Pacific Science},
  volume = {47},
  pages = {295-297},
  }

  % Airy Shaw, H.K. 1969.  Notes on Malesian and other Asiatic Euphorbiaceae. CX. Cleidion Bl. in the Solomon Islands and New Hebrides.  Kew Bulletin 23: 85–88.
  @article{AiryShaw1969,
  author = {Airy Shaw, H. K.},
  year = {1969},
  title = {Notes on Malesian and other Asiatic Euphorbiaceae},
  journal = {CX. Cleidion Bl. in the Solomon Islands and New Hebrides. Kew Bulletin},
  volume = {23},
  pages = {85-88},
  }

  % Airy Shaw, H.K.  1978.  Notes on Malesian and other Asiatic Euphorbiaceae. CXC. New or noteworthy species of Glochidion.  Kew Bulletin 32: 370–379.
  @article{AiryShaw1978,
  author = {Airy Shaw, H. K.},
  year = {1978},
  title = {Notes on Malesian and other Asiatic Euphorbiaceae},
  journal = {CXC. New or noteworthy species of Glochidion. Kew Bulletin},
  volume = {32},
  pages = {370-379},
  }

  % Airy Shaw, H.K.  1978.  Notes on Malesian and other Asiatic Euphorbiaceae. CXCVIII. New species of Claoxylon.  Kew Bulletin 32: 389–400.
  @article{AiryShaw1978-1,
  author = {Airy Shaw, H. K.},
  year = {1978},
  title = {Notes on Malesian and other Asiatic Euphorbiaceae. CXCVIII},
  journal = {New species of Claoxylon. Kew Bulletin},
  volume = {32},
  pages = {389-400},
  }

  % Airy Shaw, H.K.  1978.  Notes on Malesian and other Asiatic Euphorbiaceae. CCIII. New species of Macaranga Thouars from the Bismarcks, Solomons and New Hebrides.  Kew Bulletin 32: 410–414.
  @article{AiryShaw1978-2,
  author = {Airy Shaw, H. K.},
  year = {1978},
  title = {Notes on Malesian and other Asiatic Euphorbiaceae},
  journal = {CCIII. New species of Macaranga Thouars from the Bismarcks, Solomons and New Hebrides. Kew Bulletin},
  volume = {32},
  pages = {410-414},
  }

  % Airy Shaw, H.K.  1978.  Notes on Malesian and other Asiatic Euphorbiaceae. CCVI. A new section in Homalanthus.  Kew Bulletin 32: 418.
  @article{AiryShaw1978-3,
  author = {Airy Shaw, H. K.},
  year = {1978},
  title = {Notes on Malesian and other Asiatic Euphorbiaceae},
  journal = {CCVI. A new section in Homalanthus. Kew Bulletin},
  volume = {32},
  pages = {418},
  }

  % Almeida, T.E., S. Hennequin, H. Schneider, A.R. Smith, J.A. Nogueira Batista, A.J. Ramalho, K. Proite, and A. Salino.  2016.  Towards a phylogenetic generic classification of Thelypteridaceae:  additional sampling suggests alterations of neotropical taxa and further study of paleotropical genera.  Molecular Phylogenetics and Evolution 94: 688–700.
  @article{AlmeidaHennequinSchneiderSmithBatistaRamalhoProiteSalino2016,
  author = {Almeida, T. E. and S. Hennequin and H. Schneider and A. R. Smith and J. A. Nogueira Batista and A. J. Ramalho and K. Proite and A. Salino},
  year = {2016},
  title = {Towards a phylogenetic generic classification of Thelypteridaceae: additional sampling suggests alterations of neotropical taxa and further study of paleotropical genera},
  journal = {Molecular Phylogenetics and Evolution},
  volume = {94},
  pages = {688-700},
  }

  % Ames, O.  1932.  Contribution to the flora of the New Hebrides and Santa Cruz Islands, Orchids collected by S. F. Kajewski in 1928 and 1929.  Journal of the Arnold Arboretum 13: 127–144.
  @article{Ames1932,
  author = {Ames, O.},
  year = {1932},
  title = {Contribution to the flora of the New Hebrides and Santa Cruz Islands, Orchids collected by S},
  journal = {F. Kajewski in},
  pages = {127-144},
  volume = {1928 and 1929. Journal of the Arnold Arboretum 13},
  }

  % Anderson, C.  2011.  Revision of Ryssopterys and transfer to Stigmaphyllon (Malpighiaceae).  Blumea 56: 73– 104.
  @article{Anderson2011,
  author = {Anderson, C.},
  year = {2011},
  title = {Revision of Ryssopterys and transfer to Stigmaphyllon (Malpighiaceae)},
  journal = {Blumea},
  volume = {56},
  pages = {73-104},
  }

  % Baker, W.J., R.P. Bayton, J. Dransfield, R.A. Maturbongs.  2003.  A Revision of the Calamus aruensis (Arecaceae) complex in New Guinea and the Pacific.  Kew Bulletin 58: 351–370.
  @article{BakerBaytonDransfieldMaturbongs2003,
  author = {Baker, W. J. and R. P. Bayton and J. Dransfield and R. A. Maturbongs},
  year = {2003},
  title = {A Revision of the Calamus aruensis (Arecaceae) complex in New Guinea and the Pacific},
  journal = {Kew Bulletin},
  volume = {58},
  pages = {351-370},
  }

  % Barlow, B. A.  1992.  Conspectus of the genus Amyema Tieghem (Loranthaceae).  Blumea 36: 293–381 Barrabe, L., G. Karnadi-Abdelkader, J. Ounemoa, R.P.J. De Kok, N. Robert, and G. Gateble.  2015.  Recircumscription of Oxera (Lamiaceae: Ajugoideae) to include Faradaya based on molecular and anatomical data.  Botanical Journal of the Linnean Society 179: 693–711.
  @article{Barlow1992,
  author = {Barlow, B. A.},
  year = {1992},
  title = {Conspectus of the genus Amyema Tieghem (Loranthaceae)},
  journal = {Blumea},
  pages = {293-381},
  volume = {179},
  number = {693},
  note = {36  Barrabe, L., G. Karnadi-Abdelkader, J. Ounemoa, R. P. J. De Kok, N. Robert, and G. Gateble. 2015. Recircumscription of Oxera (Lamiaceae: Ajugoideae) to include Faradaya based on molecular and anatomical data. Botanical Journal of the Linnean Society--711},
  }

  % Bodegom, S. R.M.A.P. Haegens, B.J. van Heuven and P. Baas.  2001.  Systematic leaf anatomy of Baccaurea, Distichirhops, and Nothobaccaurea (Euphorbiaceae).  Blumea 46: 485–497
  @article{BodegomHeuvenBaas2001,
  author = {Bodegom, S. R. M. A. P. Haegens and B. J. van Heuven and P. Baas},
  year = {2001},
  title = {Systematic leaf anatomy of Baccaurea, Distichirhops, and Nothobaccaurea (Euphorbiaceae)},
  journal = {Blumea},
  volume = {46},
  pages = {485-497},
  }

  % Borsch, T., Berendsohn, W., Dalcin, E., Delmas, M., Demissew, S., Elliott, A., Fritsch, P., Fuchs, A., Geltman, D., Güner, A., Haevermans, T., Knapp, S., le Roux, M.M., Loizeau, P.-A., Miller, C., Miller, J., Miller, J.T., Palese, R., Paton, A., Parnell, J., Pendry, C., Qin, H.-N., Sosa, V., Sosef, M., von Raab-Straube, E., Ranwashe, F., Raz, L., Salimov, R., Smets, E., Thiers, B., Thomas, W., Tulig, M., Ulate, W., Ung, V., Watson, M., Jackson, P.W. and Zamora, N. (2020), World Flora Online: Placing taxonomists at the heart of a definitive and comprehensive global resource on the world's plants. TAXON, 69: 1311-1341. https://doi.org/10.1002/tax.12373
  @article{BoronR2020,
  doi = {10.1002/tax.12373},
  author = {Borsch, T. and Berendsohn, W. and Dalcin, E. and Delmas, M. and Demissew, S. and Elliott, A. and Fritsch, P. and Fuchs, A. and Geltman, D. and Güner, A. and Haevermans, T. and Knapp, S. and le Roux, M. M. and Loizeau, P.-A. and Miller, C. and Miller, J. and Miller, J. T. and Palese, R. and Paton, A. and Parnell, J. and Pendry, C. and Qin, H.-N. and Sosa, V. and Sosef, M. and von Raab-Straube, E. and Ranwashe, F. and Raz, L. and Salimov, R. and Smets, E. and Thiers, B. and Thomas, W. and Tulig, M. and Ulate, W. and Ung, V. and Watson, M. and Jackson, P. W. and Zamora, N.},
  year = {2020},
  title = {World Flora Online: Placing taxonomists at the heart of a definitive and comprehensive global resource on the world's plants},
  journal = {TAXON},
  volume = {69},
  pages = {1311-1341},
  }

  % Braithwaite, A.F.  1975.  The phytographical relationships and origin of the New Hebrides fern flora. Philosophical Transactions of the Royal Society of London. B. 272: 293–313.
  @article{Braithwaite1975,
  author = {Braithwaite, A. F.},
  year = {1975},
  title = {The phytographical relationships and origin of the New Hebrides fern flora. Philosophical Transactions of the Royal Society of London},
  journal = {B},
  volume = {272},
  pages = {293-313},
  }

  % Brownsey, P.J.  1987.  A review of the fern genus Hypolepis (Dennstaedtiaceae) in the Malesian and Pacific regions. Blumea 32: 227–276.
  @article{Brownsey1987,
  author = {Brownsey, P. J.},
  year = {1987},
  title = {A review of the fern genus Hypolepis (Dennstaedtiaceae) in the Malesian and Pacific regions},
  journal = {Blumea},
  volume = {32},
  pages = {227-276},
  }

  % Brownsey, P., J. Braggins, and L. Perrie.  2020.  Pteris carsei (Pteridaceae), a new endemic fern from New Zealand previously treated as P. comans G. Forst. New Zealand Journal of Botany 58: 214–222.
  @article{BrownseyBragginsPerrie2020,
  author = {Brownsey, P. and J. Braggins and L. Perrie},
  year = {2020},
  title = {Pteris carsei (Pteridaceae), a new endemic fern from New Zealand previously treated as P. comans G},
  journal = {Forst. New Zealand Journal of Botany},
  volume = {58},
  pages = {214-222},
  }
  % Brownsey, P.J. and L.R. Perrie.  2011.  A revised checklist of Fijian ferns and lycophytes. Telopea 13: 513–562. Brownsey, P.J. and L.R. Perrie.  2020.  Taxonomic notes on the New Zealand flora: lectotypes in Pteridaceae. New Zealand Journal of Botany 58: 245–254.
  @article{BrownseyPerrie2011,
  author = {Brownsey, P. J. and L. R. Perrie},
  year = {2011},
  title = {A revised checklist of Fijian ferns and lycophytes. Telopea 13: 513--562. Brownsey, P},
  journal = {J. and L. R. Perrie},
  pages = {245-254},
  volume = {2020. Taxonomic notes on the New Zealand flora: lectotypes in Pteridaceae. New Zealand Journal of Botany 58},
  }

  % Buerki, S., M.W. Callmander, D.S. Devey, L. Chappell, T. Gallaher, J. Munzinger, T. Haevermans, and F. Forest.  2012.  Straightening out the screw-pines: A first step in understanding phylogenetic relationships within Pandanaceae.  Taxon 61: 1010–1020.
  @article{BuerkiCallmanderDeveyChappellGallaherMunzingerHaevermansForest2012,
  author = {Buerki, S. and M. W. Callmander and D. S. Devey and L. Chappell and T. Gallaher and J. Munzinger and T. Haevermans and F. Forest},
  year = {2012},
  title = {Straightening out the screw-pines: A first step in understanding phylogenetic relationships within Pandanaceae},
  journal = {Taxon},
  volume = {61},
  pages = {1010-1020},
  }

  % Buerki, S., J. Munzinger, P.P. Lowry II & M.W. Callmander (2020). Two new genera of Sapindaceae (Cupanieae) from the southern Pacific: Lepidocupania and Neoarytera. Candollea 75: 269–284.
  @article{BuerkiMunzingerPPLowryCallmander2020,
  author = {Buerki, S. and J. Munzinger and P. P. Lowry, I. I. and M. W. Callmander},
  year = {2020},
  title = {Two new genera of Sapindaceae (Cupanieae) from the southern Pacific: Lepidocupania and Neoarytera},
  journal = {Candollea},
  volume = {75},
  pages = {269-284},
  }

  % Cahen, D., M. Toussirot, and Y. Pillon.  2020.  A revision of Ventilago (Rhamnaceae) in New Caledonia and Vanuatu with notes on dyeing properties. Willdenowia 50: 253–266.
  @article{CahenToussirotPillon2020,
  author = {Cahen, D. and M. Toussirot and Y. Pillon},
  year = {2020},
  title = {A revision of Ventilago (Rhamnaceae) in New Caledonia and Vanuatu with notes on dyeing properties},
  journal = {Willdenowia},
  volume = {50},
  pages = {253-266},
  }
  % Chambers, T.C., A.C. Jermy, and J.A. Crabbe.  1971.  A collection of ferns from Espiritu Santo, New Hebrides. British Fern Gazette 10: 175–182.
  @article{ChambersJermyCrabbe1971,
    author = {Chambers, T. C. and A. C. Jermy and J. A. Crabbe},
    year = {1971},
    title = {A collection of ferns from Espiritu Santo, New Hebrides},
    journal = {British Fern Gazette},
    volume = {10},
    pages = {175-182},
  }

  % Chambers, T.C. and P.A. Farrant.  1998.  The Blechnum procerum (“capense”) (Blechnaceae) complex in New Zealand. New Zealand Journal of Botany 36: 1–9.
  @article{ChambersFarrant1998,
    author = {Chambers, T. C. and P. A. Farrant},
    year = {1998},
    title = {The Blechnum procerum (''capense'') (Blechnaceae) complex in New Zealand},
    journal = {New Zealand Journal of Botany},
    volume = {36},
    pages = {1-9},
  }

  % Chambers, T.C. and P.A. Farrant.  2001.  Revision of Blechnum (Blechnaceae) in Malesia. Blumea 46: 283– 350.
  @article{ChambersFarrant2001,
    author = {Chambers, T. C. and P. A. Farrant},
    year = {2001},
    title = {Revision of Blechnum (Blechnaceae) in Malesia},
    journal = {Blumea},
    volume = {46},
    pages = {283-350},
  }

  % Chambers, T.C. and P.G. Wilson.  2019.  A revision of Blechnum vulcanicum (Blume) Kuhn and related taxa (Blechnaceae) in Malesia and Oceania. Telopea 22: 41–59.
  @article{ChambersWilson2019,
    author = {Chambers, T. C. and P. G. Wilson},
    year = {2019},
    title = {A revision of Blechnum vulcanicum (Blume) Kuhn and related taxa (Blechnaceae) in Malesia and Oceania},
    journal = {Telopea},
    volume = {22},
    pages = {41-59},
  }

  % Chase, M.W., A. Schuiteman, and P. Kumar.  2021.  Expansion of the orchid genus Eulophia (Eulophiinae; Epidendroideae) to include Acrolophia, Cymbidiella, Eulophiella, Geodorum, Oeceoclades and Paralophia.  Phytotaxa 491: 47–56.
  @article{ChaseSchuitemanKumar2021,
    author = {Chase, M. W. and A. Schuiteman and P. Kumar},
    year = {2021},
    title = {Expansion of the orchid genus Eulophia (Eulophiinae; Epidendroideae) to include Acrolophia, Cymbidiella, Eulophiella, Geodorum, Oeceoclades and Paralophia},
    journal = {Phytotaxa},
    volume = {491},
    pages = {47-56},
  }

  % Chase, M.W., M.J.M. Christenhusz, and A. Schuiteman.  2020.  Expansion of Calanthe to include the species of Cephalantheropsis, Gastrorchis and Phaius (Collabieae; Orchidaceae). Phytotaxa 472: 159–168.
  @article{ChaseChristenhuszSchuiteman2020,
    author = {Chase, M. W. and M. J. M. Christenhusz and A. Schuiteman},
    year = {2020},
    title = {Expansion of Calanthe to include the species of Cephalantheropsis, Gastrorchis and Phaius (Collabieae; Orchidaceae)},
    journal = {Phytotaxa},
    volume = {472},
    pages = {159-168},
  }

  % Chavez, J.G., U. Meve, N.M. Nürk, and S. Liede-Schumann.  2021.  Disentangling Antirhea (Rubiaceae): resurrection of Guettardella and description of the new genus Achilleanthus. Botanical Journal of the Linnean Society 197: 85–103.
  @article{ChavezMeveNurkLiedeSchumann2021,
    author = {Chavez, J. G. and U. Meve and N. M. Nürk and S. Liede-Schumann},
    year = {2021},
    title = {Disentangling Antirhea (Rubiaceae): resurrection of Guettardella and description of the new genus Achilleanthus},
    journal = {Botanical Journal of the Linnean Society},
    volume = {197},
    pages = {85-103},
  }

  % Chen, C.-C., J. Hyvönen, and H. Schneider.  2020. Exploring phylogeny of the microsoroid ferns (Polypodiaceae) based on six plastid DNA markers. Molecular Phylogeny and Evolution 143: article no. 106665.
  @article{ChenHyvonenSchneider2020,
    note = {article no. 106665},
    author = {Chen, C.-C. and J. Hyvönen and H. Schneider},
    year = {2020},
    title = {Exploring phylogeny of the microsoroid ferns (Polypodiaceae) based on six plastid DNA markers},
    journal = {Molecular Phylogeny and Evolution},
    volume = {143},
  }

  % Chen, C.-W., L.T. Ngan, A. Hidayat, L. Evangelista, H.P. Nooteboom, W.-L. Chiou.  2014. First insights into the evolutionary history of the Davallia repens complex. Blumea 59: 49–58.
  @article{ChenNganHidayatEvangelistaNooteboomChiou2014,
    author = {Chen, C.-W. and L. T. Ngan and A. Hidayat and L. Evangelista and H. P. Nooteboom and W.-L. Chiou},
    year = {2014},
    title = {First insights into the evolutionary history of the Davallia repens complex},
    journal = {Blumea},
    volume = {59},
    pages = {49-58},
  }

  % Chen, C.-W., S. Lindsay, L.-Y. Kuo, C. R. Fraser-Jenkins, A. Ebihara, H.T. Luu, C.W. Park, Y.-S. Chao, Y.-M. Huang, and W.-L. Chiou.  2017.  A systematic study of East Asian vittarioid ferns (Pteridaceae: Vittarioideae). Botanical Journal of the Linnean Society 183: 545–560.
  @article{ChenLindsayKuoFraserJenkinsEbiharaLuuParkChaoHuangChiou2017,
    author = {Chen, C.-W. and S. Lindsay and L.-Y. Kuo and C. R. Fraser-Jenkins and A. Ebihara and H. T. Luu and C. W. Park and Y.-S. Chao and Y.-M. Huang and W.-L. Chiou},
    year = {2017},
    title = {A systematic study of East Asian vittarioid ferns (Pteridaceae: Vittarioideae)},
    journal = {Botanical Journal of the Linnean Society},
    volume = {183},
    pages = {545-560},
  }

  % Chen, C.-W., Lindsay, S., Yong, K. T., Mustapeng, A. M. A., Amoroso, V. B., Dang, V. D., & Huang, Y.-M. (2019). Clarification of Two Poorly Known Vittarioid Ferns (Pteridaceae): Haplopteris angustissima and H. capillaris. Systematic Botany, 44(3), 483–493. doi:10.1600/036364419X15620113920545
  @article{ChenLindsayYongMustapengAmorosoDangHuang2019,
    doi = {10.1600/036364419X15620113920545},
    author = {Chen, C.-W. and Lindsay, S. and Yong, K. T. and Mustapeng, A. M. A. and Amoroso, V. B. and Dang, V. D. and Huang, Y.-M.},
    year = {2019},
    title = {Clarification of Two Poorly Known Vittarioid Ferns (Pteridaceae): Haplopteris angustissima and H. capillaris},
    journal = {Systematic Botany},
    volume = {44},
    number = {3},
    pages = {483-493},
  }

  % Chew, W.-L.  1965.  Laportea and allied genera (Urticaceae).  Gardens’ Bulletin, Singapore 21:195-208.
  @article{Chew1965,
    author = {Chew, W.-L.},
    year = {1965},
    title = {Laportea and allied genera (Urticaceae)},
    journal = {Gardens' Bulletin, Singapore},
    volume = {21},
    pages = {195-208},
  }

  % Chew, W.-L.  1969.  A monograph of Dendrocnide (Urticaceae).  Gardens’ Bulletin, Singapore 25: 1–104.
  @article{Chew1969,
    author = {Chew, W.-L.},
    year = {1969},
    title = {A monograph of Dendrocnide (Urticaceae)},
    journal = {Gardens' Bulletin, Singapore},
    volume = {25},
    pages = {1-104},
  }

  % Chew, W.-L.  1969.  A monograph of Laportea (Urticaceae).  Gardens’ Bulletin, Singapore 25: 111–178.
  @article{Chew1969-1,
    author = {Chew, W.-L.},
    year = {1969},
    title = {A monograph of Laportea (Urticaceae)},
    journal = {Gardens' Bulletin, Singapore},
    volume = {25},
    pages = {111-178},
  }

  % Chomicki, G. and S.S. Renner.  2016.  Evolutionary relationships and biogeography of the ant-epiphytic genus Squamellaria (Rubiaceae: Psychotrieae) and their taxonomic implications.  PLOS ONE, DOI:10.1371/journal.pone.0151317.
  @book{ChomickiRenner2016,
    doi = {10.1371/journal.pone.0151317},
    author = {Chomicki, G. and S. S. Renner},
    year = {2016},
    title = {Evolutionary relationships and biogeography of the ant-epiphytic genus Squamellaria (Rubiaceae: Psychotrieae) and their taxonomic implications},
    publisher = {PLOS ONE},
  }

  % Conn, B.J.  1980.  A taxonomic revision of Geniostoma subg. Geniostoma (Loganiaceae).  Blumea 26: 245– 364.
  @article{Conn1980,
    author = {Conn, B. J.},
    year = {1980},
    title = {A taxonomic revision of Geniostoma subg},
    journal = {Geniostoma (Loganiaceae). Blumea},
    volume = {26},
    pages = {245-364},
  }

  % Corner, E.J.H.  1975.  Ficus in the New Hebrides.  Philosophical Transactions of the Royal Society of London, ser. B, Biological Sciences 272: 343–367.
  @article{Corner1975,
    author = {Corner, E. J. H.},
    year = {1975},
    title = {Ficus in the New Hebrides. Philosophical Transactions of the Royal Society of London},
    journal = {ser. B, Biological Sciences},
    volume = {272},
    pages = {343-367},
  }

  % Crane, E.H.  1997.  A revised circumscription of the genera of the fern family Vittariaceae. Systematic Botany 22: 509–517.
  @article{Crane1997,
    author = {Crane, E. H.},
    year = {1997},
    title = {A revised circumscription of the genera of the fern family Vittariaceae},
    journal = {Systematic Botany},
    volume = {22},
    pages = {509-517},
  }

  % Craven, L.A.  2005.  Malesian and Australian Tournefortia transferred to Heliotropium and notes on delimitation of Boraginaceae.  Blumea 50: 375–381.
  @article{Craven2005,
    author = {Craven, L. A.},
    year = {2005},
    title = {Malesian and Australian Tournefortia transferred to Heliotropium and notes on delimitation of Boraginaceae},
    journal = {Blumea},
    volume = {50},
    pages = {375-381},
  }

  % Darwin, S.P.  1976.  The Pacific species of Ophiorrhiza L. (Rubiaceae).  Lyonia 1: 47–102.
  @article{Darwin1976,
    author = {Darwin, S. P.},
    year = {1976},
    title = {The Pacific species of Ophiorrhiza L. (Rubiaceae)},
    journal = {Lyonia},
    volume = {1},
    pages = {47-102},
  }

  % de Kok, R.P.J.  2007.  The genus Vitex L. (Lamiaceae) in New Guinea and the South Pacific Islands.  Kew Bulletin 62: 587–603. de Lange, P.J. and B. Parris.  2019.  New combinations in Cranfillia (Blechnaceae: Polypodiopsida) for recent segregates of the Blechnum vulcanicum complex. Telopea 22: 153–156. de Laubenfels, D.J.  2015.  New sections and species of Podocarpus based on the taxonomic status of P. neriifolius (Podocarpaceae) in tropical Asia.  Novon 24: 133–152. de Wilde, W.J.J.O.  1994.  Taxonomic review of Myristica (Myristicaceae) in the Pacific.  Blumea 38: 349–406.
  @article{deKok2007,
    author = {de Kok, R. P. J.},
    year = {2007},
    title = {The genus Vitex L},
    journal = {Lamiaceae) in New Guinea and the South Pacific Islands. Kew Bulletin},
    pages = {587-603},
    month = {November},
    volume = {22},
    number = {153},
    note = {62 . de Lange, P. J. and B. Parris. 2019. New combinations in Cranfillia (Blechnaceae: Polypodiopsida) for recent segregates of the Blechnum vulcanicum complex. Telopea--156. de Laubenfels, D. J. 2015. New sections and species of Podocarpus based on the taxonomic status of P. neriifolius (Podocarpaceae) in tropical Asia.  on 24: 133--152. de Wilde, W. J. J. O. 1994. Taxonomic review of Myristica (Myristicaceae) in the Pacific. Blumea 38: 349--406},
  }

  % Rio, C.D., Hennequin, S., Rouhan, G., Ebihara, A., Lowry II, P.P., Dubuisson, J. and Gaudeul1, M. (2017), Origins of the fern genus Hymenophyllum (Hymenophyllaceae) in New Caledonia: Multiple independent colonizations from surrounding territories and limited in situ diversification. Taxon, 66: 1041-1064. https://doi.org/10.12705/665.4
  @article{RioHennequinRouhanEbiharaLowryDubuissonGaudeul2017,
    doi = {10.12705/665.4},
    author = {Rio, C. D. and Hennequin, S. and Rouhan, G. and Ebihara, A. and Lowry, I. I. P. P. and Dubuisson, J. and Gaudeul1, M.},
    year = {2017},
    title = {Origins of the fern genus Hymenophyllum (Hymenophyllaceae) in New Caledonia: Multiple independent colonizations from surrounding territories and limited in situ diversification},
    journal = {Taxon},
    volume = {66},
    pages = {1041-1064},
  }

  % Dong, S.-Y.  2019.  A taxonomic revision of Tectaria (Tectariaceae) from New Caledonia. Nordic Journal of Botany 37: article no. e02310.
  @article{Dong2019,
    note = {article no. e02310},
    author = {Dong, S.-Y.},
    year = {2019},
    title = {A taxonomic revision of Tectaria (Tectariaceae) from New Caledonia},
    journal = {Nordic Journal of Botany},
    volume = {37},
  }

  % Dowe, J.L., and P. Cabalion.  1996.  A taxonomic account of Arecaceae in Vanuatu, with descriptions of three new species.  Australian Systematic Botany 9: 1–60.
  @article{DoweCabalion1996,
    author = {Dowe, J. L. and P. Cabalion},
    year = {1996},
    title = {A taxonomic account of Arecaceae in Vanuatu, with descriptions of three new species},
    journal = {Australian Systematic Botany},
    volume = {9},
    pages = {1-60},
  }

  % Dupuyoo, J.-M.  2005.  Ethnobotanical notes on Caryota ophiopellis in Vanuatu.  Palms 49: 79–83.
  @article{Dupuyoo2005,
    author = {Dupuyoo, J.-M.},
    year = {2005},
    title = {Ethnobotanical notes on Caryota ophiopellis in Vanuatu},
    journal = {Palms},
    volume = {49},
    pages = {79-83},
  }

  % Ebihara, A., J.-Y. Dubuisson, K. Iwatsuki, S. Hennequin, and M. Ito.  2006.  A taxonomic revision of Hymenophyllaceae. Blumea 51: 221–280.
  @article{EbiharaDubuissonIwatsukiHennequinIto2006,
    author = {Ebihara, A. and J.-Y. Dubuisson and K. Iwatsuki and S. Hennequin and M. Ito},
    year = {2006},
    title = {A taxonomic revision of Hymenophyllaceae},
    journal = {Blumea},
    volume = {51},
    pages = {221-280},
  }

  % Ebihara, A., K. Iwatsuki, M. Ito, S. Hennequin, J.-Y. Dubuisson.  2007.  A global molecular phylogeny of the fern genus Trichomanes (Hymenophyllaceae) with special reference to stem anatomy. Botanical Journal of the Linnean Society 155: 1–27.
  @article{EbiharaIwatsukiItoHennequinDubuisson2007,
    author = {Ebihara, A. and K. Iwatsuki and M. Ito and S. Hennequin and J.-Y. Dubuisson},
    year = {2007},
    title = {A global molecular phylogeny of the fern genus Trichomanes (Hymenophyllaceae) with special reference to stem anatomy},
    journal = {Botanical Journal of the Linnean Society},
    volume = {155},
    pages = {1-27},
  }

  % Field, A.R. and P.D. Bostock.  2013.  New and existing combinations in Palaeotropical Phlegmariurus (Lycopodiaceae) and lectotypification of the type species Phlegmariurus phlegmaria (L.) T.Sen & U.Sen. PhytoKeys 20: 33–51.
  @article{FieldBostock2013,
    author = {Field, A. R. and P. D. Bostock},
    year = {2013},
    title = {New and existing combinations in Palaeotropical Phlegmariurus (Lycopodiaceae) and lectotypification of the type species Phlegmariurus phlegmaria (L.) T},
    journal = {Sen & U. Sen. PhytoKeys},
    volume = {20},
    pages = {33-51},
  }

  % Field, A.R., W. Testo, P.D. Bostock, J.A.M. Holtum, and M. Waycott.  2016.  Molecular phylogenetics and the morphology of the Lycopodiaceae subfamily Huperzioideae supports three genera: Huperzia, Phlegmariurus and Phylloglossum. Molecular Phylogenetics and Evolution 94: 635–657.
  @article{FieldTestoBostockHoltumWaycott2016,
    author = {Field, A. R. and W. Testo and P. D. Bostock and J. A. M. Holtum and M. Waycott},
    year = {2016},
    title = {Molecular phylogenetics and the morphology of the Lycopodiaceae subfamily Huperzioideae supports three genera: Huperzia, Phlegmariurus and Phylloglossum},
    journal = {Molecular Phylogenetics and Evolution},
    volume = {94},
    pages = {635-657},
  }

  % Field, A.R.  2020. Classification and typification of Australian lycophytes and ferns based on Pteridophyte Phylogeny Group classification PPG I. Australian Systematic Botany 33: 1–102.
  @article{Field2020,
    author = {Field, A. R.},
    year = {2020},
    title = {Classification and typification of Australian lycophytes and ferns based on Pteridophyte Phylogeny Group classification PPG I},
    journal = {Australian Systematic Botany},
    volume = {33},
    pages = {1-102},
  }

  % Forster, P.I.  1991.  A taxonomic revision of Sarcolobus R. Br. (Asclepladaceae: Marsdenieae) in Australia and Papuasia.  Austrobaileya 3: 335-360.
  @article{Forster1991,
    author = {Forster, P. I.},
    year = {1991},
    title = {A taxonomic revision of Sarcolobus R},
    journal = {Br. (Asclepladaceae: Marsdenieae) in Australia and Papuasia. Austrobaileya},
    volume = {3},
    pages = {335-360},
  }

  % Forster, P.I.  1991.  The distribution and synonymy of Tylophora biglandulosa (Asclepiadaceae).  Kew Bulletin 46: 563–567.
  @article{Forster1991-1,
    author = {Forster, P. I.},
    year = {1991},
    title = {The distribution and synonymy of Tylophora biglandulosa (Asclepiadaceae)},
    journal = {Kew Bulletin},
    volume = {46},
    pages = {563-567},
  }

  % Fosberg, F.R.  1993.  The Forster Pacific islands collections from Captain Cook’s Resolution voyage. Allertonia 7: 41–86.
  @article{Fosberg1993,
    author = {Fosberg, F. R.},
    year = {1993},
    title = {The Forster Pacific islands collections from Captain Cook's Resolution voyage},
    journal = {Allertonia},
    volume = {7},
    pages = {41-86},
  }

  % Fraser-Jenkins, C.R.  2008.  Taxonomic revision of three hundred Indian subcontinental pteridophytes with a revised census-list. Dehra Dun: Bishen Singh Mehendra Pal Singh.
  @book{FraserJenkins2008,
    author = {Fraser-Jenkins, C. R.},
    year = {2008},
    title = {Taxonomic revision of three hundred {I}ndian subcontinental pteridophytes with a revised census-list},
    publisher = {Bishen Singh Mehendra Pal Singh},
    address = {Dehra Dun},
  }

  % Gabel, M.L.  1982.  A biosystematic study of the genus Imperata (Gramineae: Andropogoneae).  Doctoral dissertation.  Ames:  Iowa State University.  99 pages.
  @phdthesis{Gabel1982,
    note = {Ames},
    author = {Gabel, M. L.},
    year = {1982},
    title = {A biosystematic study of the genus Imperata (Gramineae: Andropogoneae)},
    school = {Iowa State University. 99 pages},
  }

  % Game, J.C., S. Pene, and A.R. Smith.  2020.  A new specimen-based checklist of ferns and lycophytes from Rotuma (Fiji). New Zealand Journal of Botany https://doi.org/10.1080/0028825X.2020.1775658
  @article{GamePeneSmith2020,
    doi = {10.1080/0028825X.2020.1775658},
    author = {Game, J. C. and S. Pene and A. R. Smith},
    year = {2020},
    title = {A new specimen-based checklist of ferns and lycophytes from Rotuma (Fiji)},
    journal = {New Zealand Journal of Botany},
  }

  % Gardner, E.M., M. Garner, R. Cowan, S. Dodsworth, N. Epitawalage, D. Arifiani, Sahromi, W.J. Baker, F. Forest, O. Maurin, N.J.C. Zerega, A.K. Monro and A.L. Hipp.  2021.  Repeated parallel losses of inflexed stamens in Moraceae:  Phylogenomics and generic revision of the tribe Moreae and the reinstatement of the tribe Olmedieae (Moraceae).  Taxon 70: 946–988.
  @article{GardnerGarnerCowanDodsworthEpitawalageD2021,
    author = {Gardner, E. M. and M. Garner and R. Cowan and S. Dodsworth and N. Epitawalage and D. Arifiani, Sahromi and W. J. Baker and F. Forest and O. Maurin and N. J. C. Zerega and A. K. Monro and A. L. Hipp},
    year = {2021},
    title = {Repeated parallel losses of inflexed stamens in Moraceae: Phylogenomics and generic revision of the tribe Moreae and the reinstatement of the tribe Olmedieae (Moraceae)},
    journal = {Taxon},
    volume = {70},
    pages = {946-988},
  }

  % Gardner, J.J.S., L. Perrie, L. Shepherd, and N.S. Nagalingum.  2017.  Taxonomic Placement of Unassigned Species of Lastreopsid Ferns (Dryopteridaceae) Using Phylogeny. Systematic Botany 42: 385–391.
  @article{GardnerPerrieShepherdNagalingum2017,
    author = {Gardner, J. J. S. and L. Perrie and L. Shepherd and N. S. Nagalingum},
    year = {2017},
    title = {Taxonomic Placement of Unassigned Species of Lastreopsid Ferns (Dryopteridaceae) Using Phylogeny},
    journal = {Systematic Botany},
    volume = {42},
    pages = {385-391},
  }

  % Gardner, R.O.  2010.  Piper (Piperaceae) in the Solomon Islands: the climbing species.  Blumea 55: 4–13.
  @article{Gardner2010,
    author = {Gardner, R. O.},
    year = {2010},
    title = {Piper (Piperaceae) in the Solomon Islands: the climbing species},
    journal = {Blumea},
    volume = {55},
    pages = {4-13},
  }

  % Gasper, A.L. de, V.A.d.O. Dittrich. A.R. Smith, and A. Salino.  2016.  A classification for Blechnaceae (Polypodiales: Polypodiopsida): new genera, resurrected names, and combinations. Phytotaxa 275: 191–227.
  @article{Gasper2016,
    author = {Gasper, A.},
    title = {L},
    year = {2016},
    journal = {de},
    pages = {191-227},
    volume = {V. A.d. O. Dittrich. A. R. Smith, and A. Salino. A classification for Blechnaceae (Polypodiales: Polypodiopsida): new genera, resurrected names, and combinations. Phytotaxa 275},
  }

  % Gasper, A.L. de, T.E. Almeida, V.A.d.O. Dittrich, A.R. Smith, and A. Salino.  2016.  Molecular phylogeny of the fern family Blechnaceae (Polypodiales) with a revised genus-level treatment. Cladistics 32: 1–18.
  @article{Gasper2016-1,
    author = {Gasper, A.},
    title = {L. de, T},
    year = {2016},
    journal = {E. Almeida},
    pages = {1-18},
    volume = {V. A.d. O. Dittrich, A. R. Smith, and A. Salino. Molecular phylogeny of the fern family Blechnaceae (Polypodiales) with a revised genus-level treatment. Cladistics 32},
  }

  % Gâteblé, G., L. Ramon, J.-F. Butaud.  2019.  A new coastal species of Pseuderanthemum (Acanthaceae) from Loyalty Islands (New Caledonia) and Vanuatu with notes on P. carruthersii.   PhytoKeys 128: 73–84.
  @article{G-,
    author = {Gâteblé, G. and L. Ramon and J.-F. Butaud},
    year = {2019},
    title = {A new coastal species of Pseuderanthemum (Acanthaceae) from Loyalty Islands (New Caledonia) and Vanuatu with notes on P. carruthersii},
    journal = {PhytoKeys},
    volume = {128},
    pages = {73-84},
  }

  % Geiger, D.L., B.J. Crain, M.K. McCormick, and D.F. Whigham.  2020.  Studies on Oberonia 7:  Ten new synonyms of Oberonia equitans (G. Forst.) Mutel indicated by morphology and molecular phylogeny.  Orchids 656–667.
  @article{GeigerCrainMcCormickWhigham2020,
    author = {Geiger, D. L. and B. J. Crain and M. K. McCormick and D. F. Whigham},
    year = {2020},
    title = {Studies on Oberonia 7: Ten new synonyms of Oberonia equitans (G. Forst.) Mutel indicated by morphology and molecular phylogeny},
    journal = {Orchids},
    pages = {656-667},
  }

  % Gemmill, C.E.C., G.J. Allan, W.L. Wagner, and E.A. Zimmer.  2002.  Evolution of insular Pacific Pittosporum (Pittosporaceae): origin of the Hawaiian radiation.  Molecular Phylogenetics and Evolution 22: 31–42. Gillett, G.W.  1974.  New Records for Cyrtandra (Gesneriaceae) in the New Hebrides.  Kew Bulletin 29 699– 709.
  @article{GemmillAllanWagnerZimmer2002,
    author = {Gemmill, C. E. C. and G. J. Allan and W. L. Wagner and E. A. Zimmer},
    year = {2002},
    title = {Evolution of insular Pacific Pittosporum (Pittosporaceae): origin of the Hawaiian radiation. Molecular Phylogenetics and Evolution 22: 31--42. Gillett},
    journal = {G. W},
    pages = {699-709},
    volume = {1974. New Records for Cyrtandra (Gesneriaceae) in the New Hebrides. Kew Bulletin 29},
  }

  % Green, P.S.  1969.  Notes on Melanesian Plants: I.  Kew Bulletin 23: 337–346.
  @article{Green1969,
    author = {Green, P. S.},
    year = {1969},
    title = {Notes on Melanesian Plants: I},
    journal = {Kew Bulletin},
    volume = {23},
    pages = {337-346},
  }

  % Green, P.S.  1990.  Notes Relating to the Floras of Norfolk and Lord Howe Islands, III.  Kew Bulletin 45: 235– 255.
  @article{Green1990,
    author = {Green, P. S.},
    year = {1990},
    title = {Notes Relating to the Floras of Norfolk and Lord Howe Islands, III},
    journal = {Kew Bulletin},
    volume = {45},
    pages = {235-255},
  }

  % Green, T.  2006.  Hoya vanuatuensis, a new/old species.  Fraterna 19: 4–6.
  @article{Green2006,
    author = {Green, T.},
    year = {2006},
    title = {Hoya vanuatuensis, a new/old species},
    journal = {Fraterna},
    volume = {19},
    pages = {4-6},
  }

  % Guillaumin, A.  1932a.  Contribution to the flora of the New Hebrides, Plants collected by S. F. Kajewski in 1928 and 1929 [Rubiaceae]. Journal of the Arnold Arboretum 13: 1–29.
  @article{Guillaumin1932,
    author = {Guillaumin, A.},
    year = {1932},
    title = {Contribution to the flora of the New Hebrides, Plants collected by S},
    journal = {F. Kajewski in},
    pages = {1-29},
    volume = {1928 and 1929 [Rubiaceae]. Journal of the Arnold Arboretum 13},
  }

  % Guillaumin, A.  1932b.  Contribution to the flora of the New Hebrides, Plants collected by S. F. Kajewski in 1928 and 1929. Journal of the Arnold Arboretum 13: 81–126.
  @article{Guillaumin1932-1,
    author = {Guillaumin, A.},
    year = {1932},
    title = {Contribution to the flora of the New Hebrides, Plants collected by S},
    journal = {F. Kajewski in},
    pages = {81-126},
    volume = {1928 and 1929. Journal of the Arnold Arboretum 13},
  }

  % Guymer, G.P.  2005.  New species of Commersonia J.R.Forst. & G.Forst. (Sterculiaceae) from eastern Australia and Vanuatu.  Austrobaileya 7: 231–250.
  @article{Guymer2005,
    author = {Guymer, G. P.},
    year = {2005},
    title = {New species of Commersonia J},
    journal = {R. Forst. & G. Forst. (Sterculiaceae) from eastern Australia and Vanuatu. Austrobaileya},
    volume = {7},
    pages = {231-250},
  }

  % Hadiah, J.T., C.J. Quinn, and B.J. Conn.  2003.  Phylogeny of Elatostema (Urticaceae) using chloroplast DNA data.  Telopea 10: 235–246.
  @article{HadiahQuinnConn2003,
    author = {Hadiah, J. T. and C. J. Quinn and B. J. Conn},
    year = {2003},
    title = {Phylogeny of Elatostema (Urticaceae) using chloroplast DNA data},
    journal = {Telopea},
    volume = {10},
    pages = {235-246},
  }

  % Haegens, R.M.A.P.  2000.  Taxonomy, phylogeny, and biogeography of Baccaurea, Distichirhops, and Nothobaccaurea (Euphorbiaceae). Blumea, Supplement 12: 1–218.
  @article{Haegens2000,
    author = {Haegens, R. M. A. P.},
    year = {2000},
    title = {Taxonomy, phylogeny, and biogeography of Baccaurea, Distichirhops, and Nothobaccaurea (Euphorbiaceae)},
    journal = {Blumea, Supplement},
    volume = {12},
    pages = {1-218},
  }

  % Haas, J.E.  1977.  The Pacific species of Pittosporum Banks Ex Gaertn. (Pittosporaceae).  Allertonia 1: 73–167.
  @article{Haas1977,
    author = {Haas, J. E.},
    year = {1977},
    title = {The Pacific species of Pittosporum Banks Ex Gaertn. (Pittosporaceae)},
    journal = {Allertonia},
    volume = {1},
    pages = {73-167},
  }

  % Hartley, T.G.  2000.  On the Taxonomy and Biogeography of Euodia and Melicope (Rutaceae) Allertonia 8: 1– 328.
  @unpublished{Hartley2000,
    author = {Hartley, T. G.},
    year = {2000},
    title = {On the Taxonomy and Biogeography of Euodia and Melicope (Rutaceae) Allertonia 8: 1-- 328},
  }

  % He, L.-J. and X.-C. Zhang.  2012.  Exploring generic delimitation within the fern family Thelypteridaceae. Molecular Phylogenetics and Evolution 65: 757–764.
  @article{HeZhang2012,
    author = {He, L.-J. and X.-C. Zhang},
    year = {2012},
    title = {Exploring generic delimitation within the fern family Thelypteridaceae},
    journal = {Molecular Phylogenetics and Evolution},
    volume = {65},
    pages = {757-764},
  }

  % He, L., H. Schneider, P. Hovenkamp, J. Marquardt, R. Wei, X. Wei, X. Zhang, and Q. Xiang.  2018.  A molecular phylogeny of selligueoid ferns (Polypodiaceae): Implications for a natural delimitation despite homoplasy and rapid radiation. Taxon 67: 237–249.
  @article{HeSchneiderHovenkampMarquardtWeiWeiZhangXiang2018,
    author = {He, L. and H. Schneider and P. Hovenkamp and J. Marquardt and R. Wei and X. Wei and X. Zhang and Q. Xiang},
    year = {2018},
    title = {A molecular phylogeny of selligueoid ferns (Polypodiaceae): Implications for a natural delimitation despite homoplasy and rapid radiation},
    journal = {Taxon},
    volume = {67},
    pages = {237-249},
  }

  % Hennequin, S., A. Ebihara, M. Ito, K. Iwatsuki, and J.-Y. Dubuisson.  2006.  New Insights into the phylogeny of the genus Hymenophyllum s.l. (Hymenophyllaceae): revealing the polyphyly of Mecodium. Systematic Botany 31: 271–284.
  @article{HennequinEbiharaItoIwatsukiDubuisson2006,
    author = {Hennequin, S. and A. Ebihara and M. Ito and K. Iwatsuki and J.-Y. Dubuisson},
    year = {2006},
    title = {New Insights into the phylogeny of the genus Hymenophyllum s.l},
    journal = {Hymenophyllaceae): revealing the polyphyly of Mecodium. Systematic Botany},
    volume = {31},
    pages = {271-284},
  }

  % Hodel, D.R., J.F. Butaud, C.F. Barrett, M.H. Grayum, J. Komen, D.H. Lorence, J. Marcus, and A. Falchetto.  2019.  Reassessment of Pelagodoxa.  Palms 63: 113–146.
  @article{HodelButaudBarrettGrayumKomenLorenceMarcusFalchetto2019,
    author = {Hodel, D. R. and J. F. Butaud and C. F. Barrett and M. H. Grayum and J. Komen and D. H. Lorence and J. Marcus and A. Falchetto},
    year = {2019},
    title = {Reassessment of Pelagodoxa},
    journal = {Palms},
    volume = {63},
    pages = {113-146},
  }

  % Hoffmann, P., K. Hashendra, and K.J. Wurdack.  2006.  A phylogenetic classification of Phyllanthaceae (Malpighiales; Euphorbiaceae sensu lato).  Kew Bulletin 61: 37–53
  @article{HoffmannHashendraWurdack2006,
    author = {Hoffmann, P. and K. Hashendra and K. J. Wurdack},
    year = {2006},
    title = {A phylogenetic classification of Phyllanthaceae (Malpighiales; Euphorbiaceae sensu lato)},
    journal = {Kew Bulletin},
    volume = {61},
    pages = {37-53},
  }

  % Holttum, R.E.  1964.  The tree-ferns of the genus Cyathea in Australasia and the Pacific. Blumea 12: 241–274.
  @article{Holttum1964,
    author = {Holttum, R. E.},
    year = {1964},
    title = {The tree-ferns of the genus Cyathea in Australasia and the Pacific},
    journal = {Blumea},
    volume = {12},
    pages = {241-274},
  }

  % Holttum, R.E.  1966.  The genera Lomariopsis, Teratophyllum, and Lomagramma in the islands of the Pacific and Australia. Blumea 14: 215–223.
  @article{Holttum1966,
    author = {Holttum, R. E.},
    year = {1966},
    title = {The genera Lomariopsis, Teratophyllum, and Lomagramma in the islands of the Pacific and Australia},
    journal = {Blumea},
    volume = {14},
    pages = {215-223},
  }

  % Holttum, R.E., U. Sen, and D. Mittra.  1970.  Studies in the family Thelypteridaceae II. A comparative study of the type-species of Thelypteris Schmidel, Cyclosorus link, and Ampelopteris Kunze. Blumea 18: 195– 215.
  @article{HolttumSenMittra1970,
    author = {Holttum, R. E. and U. Sen and D. Mittra},
    year = {1970},
    title = {Studies in the family Thelypteridaceae II. A comparative study of the type-species of Thelypteris Schmidel, Cyclosorus link, and Ampelopteris Kunze},
    journal = {Blumea},
    volume = {18},
    pages = {195-215},
  }

  % Holttum, R.E.  1971.  Stusies in the Family Thelypteridaceae. III. A new system of genera in the Old World. Blumea 17: 19: 17–52.
  @article{Holttum1971,
    author = {Holttum, R. E.},
    year = {1971},
    title = {Stusies in the Family Thelypteridaceae. III. A new system of genera in the Old World},
    journal = {Blumea},
    volume = {17},
    number = {19},
    pages = {17-52},
  }

  % Holttum, R.E.  1972.  Studies in the family Thelypteridaceae IV. The genus Pronephrium Presl. Blumea 20: 105–126.
  @article{Holttum1972,
    author = {Holttum, R. E.},
    year = {1972},
    title = {Studies in the family Thelypteridaceae IV},
    journal = {The genus Pronephrium Presl. Blumea},
    volume = {20},
    pages = {105-126},
  }

  % Holttum, R.E.  1973.  Studies in the family Thelypteridaceae V. The genus Pneumatopteris Nakai. Blumea 21: 293–325.
  @article{Holttum1973,
    author = {Holttum, R. E.},
    year = {1973},
    title = {Studies in the family Thelypteridaceae V},
    journal = {The genus Pneumatopteris Nakai. Blumea},
    volume = {21},
    pages = {293-325},
  }

  % Holttum, R.E.  1974.  Asplenium Linn., sect. Thamnopteris Presl. Gardens’ Bulletin, Singapore 27: 143–154.
  @article{Holttum1974,
    author = {Holttum, R. E.},
    year = {1974},
    title = {Asplenium Linn., sect. Thamnopteris Presl},
    journal = {Gardens' Bulletin, Singapore},
    volume = {27},
    pages = {143-154},
  }

  % Holttum, R.E.  1975.  Studies in the family Thelypteridaceae VIII. The genera Mesophlebion and Plesioneuron. Blumea 22: 223–250.
  @article{Holttum1975,
    author = {Holttum, R. E.},
    year = {1975},
    title = {Studies in the family Thelypteridaceae VIII. The genera Mesophlebion and Plesioneuron},
    journal = {Blumea},
    volume = {22},
    pages = {223-250},
  }

  % Holttum, R.E.  1976a.  Studies in the family Thelypteridaceae X. The genus Coryphopteris. Blumea 23: 18–47.
  @article{Holttum1976,
    author = {Holttum, R. E.},
    year = {1976},
    title = {Studies in the family Thelypteridaceae X},
    journal = {The genus Coryphopteris. Blumea},
    volume = {23},
    pages = {18-47},
  }

  % Holttum, R.E.  1976b.  The genus Christella Leveille, sect. Christella. Studies in the family Thelypteridaceae, X. Kew Bulletin 31: 293–339.
  @article{Holttum1976-1,
    author = {Holttum, R. E.},
    year = {1976},
    title = {The genus Christella Leveille, sect. Christella},
    journal = {Studies in the family Thelypteridaceae, X. Kew Bulletin},
    volume = {31},
    pages = {293-339},
  }

  % Holttum, R.E.  1977a.  The family Thelypteridaceae in the Pacific and Australasia. Allertonia 1: 169–234.
  @article{Holttum1977,
    author = {Holttum, R. E.},
    year = {1977},
    title = {The family Thelypteridaceae in the Pacific and Australasia},
    journal = {Allertonia},
    volume = {1},
    pages = {169-234},
  }

  % Holttum, R.E.  1977b.  Studies in the family Thelypteridaceae XII. The genus Amphineuron (Holttum). Blumea 23: 205–218.
  @article{Holttum1977-1,
    author = {Holttum, R. E.},
    year = {1977},
    title = {Studies in the family Thelypteridaceae XII},
    journal = {The genus Amphineuron (Holttum). Blumea},
    volume = {23},
    pages = {205-218},
  }

  % Holub, J.  1985.  Transfers of Lycopodium species to Huperzia: with a note on generic classification in Huperziaceae. Folia Geobotanica et Phytotaxonomica 20: 67–80.
  @article{Holub1985,
    author = {Holub, J.},
    year = {1985},
    title = {Transfers of Lycopodium species to Huperzia: with a note on generic classification in Huperziaceae},
    journal = {Folia Geobotanica et Phytotaxonomica},
    volume = {20},
    pages = {67-80},
  }

  % Hopkins, H.C.F.  1998.  A revision of Weinmannia (Cunoniaceae) in Malesia and the Pacific. 3. New Guinea, Solomon Islands, Vanuatu and Fiji, with notes on the species of Samoa, Rarotonga, New Caledonia and New Zealand.  Adansonia, sér. 3, 20: 67–106.
  @article{Hopkins1998,
    author = {Hopkins, H. C. F.},
    year = {1998},
    title = {A revision of Weinmannia (Cunoniaceae) in Malesia and the Pacific. 3. New Guinea, Solomon Islands, Vanuatu and Fiji, with notes on the species of Samoa, Rarotonga, New Caledonia and New Zealand},
    journal = {Adansonia, sér},
    volume = {3},
    number = {20},
    pages = {67-106},
  }

  % Hoogland, R.D.  1952.  A revision of the genus Dillenia.  Blumea 7: 1–145.
  @article{Hoogland1952,
    author = {Hoogland, R. D.},
    year = {1952},
    title = {A revision of the genus Dillenia},
    journal = {Blumea},
    volume = {7},
    pages = {1-145},
  }

  % Hovenkamp, P.  1986.  A Monograph of the Fern Genus Pyrrosia. Leiden: E. J. Brill/Leiden University Press.
  @book{Hovenkamp1986,
    author = {Hovenkamp, P.},
    year = {1986},
    title = {A Monograph of the Fern Genus Pyrrosia},
    publisher = {E. J. Brill/Leiden University Press},
    address = {Leiden},
  }

  % Hovenkamp, P.  1998.  Lepisorus in Malesia. Blumea 43: 109–115.
  @article{Hovenkamp1998,
    author = {Hovenkamp, P.},
    year = {1998},
    title = {Lepisorus in Malesia},
    journal = {Blumea},
    volume = {43},
    pages = {109-115},
  }

  % Hovenkamp, P.  2019.  Flora of Singapore precursors, 13. New names and lectotypifications in Athyriaceae and Polypodiaceae. Gardens’ Bulletin Singapore 71: 61–67.
  @article{Hovenkamp2019,
    author = {Hovenkamp, P.},
    year = {2019},
    title = {Flora of Singapore precursors, 13. New names and lectotypifications in Athyriaceae and Polypodiaceae},
    journal = {Gardens' Bulletin Singapore},
    volume = {71},
    pages = {61-67},
  }

  % Hovenkamp, P.H. and N.A.P. Franken.  1993.  An account of the fern genus Belvisia Mirbel (Polypodiaceae). Blumea 37: 511–527.
  @article{HovenkampFranken1993,
    author = {Hovenkamp, P. H. and N. A. P. Franken},
    year = {1993},
    title = {An account of the fern genus Belvisia Mirbel (Polypodiaceae)},
    journal = {Blumea},
    volume = {37},
    pages = {511-527},
  }

  % Hovenkamp, P.H. and F. Miyamoto.  2005.  A conspectus of the native and naturalized species of Nephrolepis (Nephrolepidaceae) in the world. Blumea 50: 279–322.
  @article{HovenkampMiyamoto2005,
    author = {Hovenkamp, P. H. and F. Miyamoto},
    year = {2005},
    title = {A conspectus of the native and naturalized species of Nephrolepis (Nephrolepidaceae) in the world},
    journal = {Blumea},
    volume = {50},
    pages = {279-322},
  }

  % Hovenkamp, P.H. and B.-C. Ho.  2012.  A revision of the fern genus Oleandra (Oleandraceae) in Asia. PhytoKeys 11: 1–37.
  @article{HovenkampHo2012,
    author = {Hovenkamp, P. H. and B.-C. Ho},
    year = {2012},
    title = {A revision of the fern genus Oleandra (Oleandraceae) in Asia},
    journal = {PhytoKeys},
    volume = {11},
    pages = {1-37},
  }

  % Iwatsuki, K., A. Ebihara, and M. Kato.  2019.  Taxonomic studies of pteridophytes of Ambon and Seram (Moluccas) collected on Indonesian- Japanese botanical expeditions 1983–1986. XIII. Hymenophyllaceae. PhytoKeys 119: 107–115.
  @article{IwatsukiEbiharaKato2019,
    author = {Iwatsuki, K. and A. Ebihara and M. Kato},
    year = {2019},
    title = {Taxonomic studies of pteridophytes of Ambon and Seram (Moluccas) collected on Indonesian- Japanese botanical expeditions 1983--1986},
    journal = {XIII. Hymenophyllaceae. PhytoKeys},
    volume = {119},
    pages = {107-115},
  }

  % Jacques, F.M.B., and P. Bertolino.  2008.  Molecular and morphological phylogeny of Menispermaceae (Ranunculales).  Plant Systematics and Evolution 274: 83–97.
  @article{JacquesBertolino2008,
    author = {Jacques, F. M. B. and P. Bertolino},
    year = {2008},
    title = {Molecular and morphological phylogeny of Menispermaceae (Ranunculales)},
    journal = {Plant Systematics and Evolution},
    volume = {274},
    pages = {83-97},
  }

  % Jérémie, J.  1978.  Étude des Monimiaceae:  revision du genre Hedycarya.  Adansonia, sér. 2, 18: 25–53.
  @article{Jeremie1978,
    author = {Jérémie, J.},
    year = {1978},
    title = {Étude des Monimiaceae: revision du genre Hedycarya},
    journal = {Adansonia, sér},
    volume = {2},
    number = {18},
    pages = {25-53},
  }

  % Kocyan, A., and A. Schuiteman.  2014.  New combinations in Aeridinae (Orchidaceae).  Phytotaxa 161: 61–85.
  @article{KocyanSchuiteman2014,
    author = {Kocyan, A. and A. Schuiteman},
    year = {2014},
    title = {New combinations in Aeridinae (Orchidaceae)},
    journal = {Phytotaxa},
    volume = {161},
    pages = {61-85},
  }

  % Kostermans, J.G.H.  1974.  Materials for a revision of Lauraceae IV.  Reinwardtia 9: 97–115.
  @article{Kostermans1974,
    author = {Kostermans, J. G. H.},
    year = {1974},
    title = {Materials for a revision of Lauraceae IV},
    journal = {Reinwardtia},
    volume = {9},
    pages = {97-115},
  }

  % Kramina, T., and D. Sokoloff.  2004.  A taxonomic study of Lotus australis complex (Leguminosae), with special emphasis on plants from Pacific Ocean islands.  Adansonia, sér. 3, 26: 171-197.
  @article{KraminaSokoloff2004,
    author = {Kramina, T. and D. Sokoloff},
    year = {2004},
    title = {A taxonomic study of Lotus australis complex (Leguminosae), with special emphasis on plants from Pacific Ocean islands},
    journal = {Adansonia, sér},
    volume = {3},
    number = {26},
    pages = {171-197},
  }

  % Kreier, H.-P., X.-C. Zhang, H. Muth, and H. Schneider.  2008.  The microsoroid ferns: Inferring the relationships of a highly diverse lineage of Paleotropical epiphytic ferns (Polypodiaceae, Polypodiopsida). Molecular Phylogenetics and Evolution 48: 1155–1167.
  @article{KreierZhangMuthSchneider2008,
    author = {Kreier, H.-P. and X.-C. Zhang and H. Muth and H. Schneider},
    year = {2008},
    title = {The microsoroid ferns: Inferring the relationships of a highly diverse lineage of Paleotropical epiphytic ferns (Polypodiaceae, Polypodiopsida)},
    journal = {Molecular Phylogenetics and Evolution},
    volume = {48},
    pages = {1155-1167},
  }

  % Kuhn, M.  1869.  Filices Novarum Hebridarum. Zoologisch-Botanische Gesellschaft in Wien. - KaiserlichKönigliche Zoologisch-Botanische Gesellschaft in Wien Bd. 19: 569–586.
  @article{Kuhn1869,
    author = {Kuhn, M.},
    year = {1869},
    title = {Filices Novarum Hebridarum. Zoologisch-Botanische Gesellschaft in Wien},
    journal = {KaiserlichKönigliche Zoologisch-Botanische Gesellschaft in Wien},
    volume = {19},
    pages = {569-586},
  }

  % Kuo, L.-Y., A. Ebihara, T.-C. Hsu, G. Rouhan, Y.-M. Huang, C.-N. Wang, W.-L. Chiou, and M. Kato.  2018.  Infrageneric revision of the fern genus Deparia (Athyriaceae, Aspleniineae, Polypodiales). Systematic Botany 43: 645–655.
  @article{KuoEbiharaHsuRouhanHuangWangChiouKato2018,
    author = {Kuo, L.-Y. and A. Ebihara and T.-C. Hsu and G. Rouhan and Y.-M. Huang and C.-N. Wang and W.-L. Chiou and M. Kato},
    year = {2018},
    title = {Infrageneric revision of the fern genus Deparia (Athyriaceae, Aspleniineae, Polypodiales)},
    journal = {Systematic Botany},
    volume = {43},
    pages = {645-655},
  }

  % Lebot, V., R. Malapa, and K. Abraham.  2017.  The Pacific yam (Dioscorea nummularia Lam.), an underexploited tuber crop from Melanesia.  Genetic Resources and Crop Evolution 64:217–235.
  @article{LebotMalapaAbraham2017,
    author = {Lebot, V. and R. Malapa and K. Abraham},
    year = {2017},
    title = {The Pacific yam (Dioscorea nummularia Lam.), an underexploited tuber crop from Melanesia},
    journal = {Genetic Resources and Crop Evolution},
    volume = {64},
    pages = {217-235},
  }

  % Lebot, V., K. Abraham, J. Kaoh, C. Rogers, and T. Molisale.  2019.  Development of anthracnose resistant hybrids of the greater yam (Dioscorea alata L.) and interspecific hybrids with D. nummularia Lam.  Genetic Resources and Crop Evolution 66: 871–883.
  @article{LebotAbrahamKaohRogersMolisale2019,
    author = {Lebot, V. and K. Abraham and J. Kaoh and C. Rogers and T. Molisale},
    year = {2019},
    title = {Development of anthracnose resistant hybrids of the greater yam (Dioscorea alata L.) and interspecific hybrids with D. nummularia Lam},
    journal = {Genetic Resources and Crop Evolution},
    volume = {66},
    pages = {871-883},
  }

  % Leenhouts, P.W.  1967.  A conspectus of the genus Allophylus (Sapindaceae).  Blumea 15: 301–358.
  @article{Leenhouts1967,
    author = {Leenhouts, P. W.},
    year = {1967},
    title = {A conspectus of the genus Allophylus (Sapindaceae)},
    journal = {Blumea},
    volume = {15},
    pages = {301-358},
  }

  % Lehtonen, S., H. Tuomisto, G. Rouhan, and M.J.M. Christenbhusz.  2010.  Phylogenetics and classification of the pantropical fern family Lindsaeaceae. Botanical Journal of the Linnean Society 163: 305–359.
  @article{LehtonenTuomistoRouhanChristenbhusz2010,
    author = {Lehtonen, S. and H. Tuomisto and G. Rouhan and M. J. M. Christenbhusz},
    year = {2010},
    title = {Phylogenetics and classification of the pantropical fern family Lindsaeaceae},
    journal = {Botanical Journal of the Linnean Society},
    volume = {163},
    pages = {305-359},
  }

  % Lewis, B.A.  1992.  Additions to the Orchid Flora of Vanuatu in the South-West Pacific.  Kew Bulletin 47: 685– 691.
  @article{Lewis1992,
    author = {Lewis, B. A.},
    year = {1992},
    title = {Additions to the Orchid Flora of Vanuatu in the South-West Pacific},
    journal = {Kew Bulletin},
    volume = {47},
    pages = {685-691},
  }

  % Lowry, P.P. II.  1986.  A systematic study of Delarbrea Vieill. (Araliaceae).  Allertonia 4: 169–201.
  @article{Lowry1986,
    author = {Lowry, P. P. I. I.},
    year = {1986},
    title = {A systematic study of Delarbrea Vieill. (Araliaceae)},
    journal = {Allertonia},
    volume = {4},
    pages = {169-201},
  }

  % Lowry, P.P. II.  1989.  A revision of Araliaceae from Vanuatu.  Bulletin du Muséum National d’Histoire Naturelle 4e série, sect. B, Adansonia 11: 117–155.
  @article{Lowry1989,
    author = {Lowry, P. P. I. I.},
    year = {1989},
    title = {A revision of Araliaceae from Vanuatu},
    journal = {Bulletin du Muséum National d'Histoire Naturelle},
    pages = {117-155},
    volume = {4e série, sect. B, Adansonia 11},
  }

  % Lowry, P.P. II, G.M. Plunkett, and D.G. Frodin.  2013.  Revision of Plerandra (Araliaceae). I. A synopsis of the genus with an expanded circumscription and a new infrageneric classification.  Brittonia 65: 42–61.
  @article{LowryPlunkettFrodin2013,
    author = {Lowry, P. P. I. I. and G. M. Plunkett and D. G. Frodin},
    year = {2013},
    title = {Revision of Plerandra (Araliaceae). I. A synopsis of the genus with an expanded circumscription and a new infrageneric classification},
    journal = {Brittonia},
    volume = {65},
    pages = {42-61},
  }

  % Luebert, F., L. Cecchi, M.W. Frohlich, M. Gottschling, C.M. Guilliams, K.E. Hasenstab-Lehman, H.H. Hilger, J.S. Miller, M. Mittelbach, M. Nazaire, and M. Nepi.  2016.  Familial classification of the Boraginales. Taxon 65: 502–522.
  @article{LuebertCecchiFrohlichGottschlingGuilliamsHasenstabLehmanHilgerMillerMittelbachNazaireNepi2016,
    author = {Luebert, F. and L. Cecchi and M. W. Frohlich and M. Gottschling and C. M. Guilliams and K. E. Hasenstab-Lehman and H. H. Hilger and J. S. Miller and M. Mittelbach and M. Nazaire and M. Nepi},
    year = {2016},
    title = {Familial classification of the Boraginales},
    journal = {Taxon},
    volume = {65},
    pages = {502-522},
  }

  % Mabberley, D.J.  1994.  New species of Dysoxylum (Meliaceae).  Blumea 38: 303–312.
  @article{Mabberley1994,
    author = {Mabberley, D. J.},
    year = {1994},
    title = {New species of Dysoxylum (Meliaceae)},
    journal = {Blumea},
    volume = {38},
    pages = {303-312},
  }

  % Mabberley, D.J., C.M. Pannell, and A.M. Sing.  1995.  Meliaceae.  Flora Malesiana 1, 12(1).  407 pages.
  @article{MabberleyPannellSing1995,
    author = {Mabberley, D. J. and C. M. Pannell and A. M. Sing},
    year = {1995},
    title = {Meliaceae},
    journal = {Flora Malesiana},
    pages = {12},
    volume = {1},
    note = {1). 407 pages},
  }

  % Maxwell, J.F., and J.F. Veldkamp.  1990.  Notes on the Astronieae (Melastomataceae) – II.  Astronidium, Beccariathus.  Blumea 35: 115–165.
  @article{MaxwellVeldkamp1990,
    author = {Maxwell, J. F. and J. F. Veldkamp},
    year = {1990},
    title = {Notes on the Astronieae (Melastomataceae) -- II},
    journal = {Astronidium, Beccariathus. Blumea},
    volume = {35},
    pages = {115-165},
  }

  % Meyer, K.  2001.  Revision of the Southeast Asian genus Melastoma.  Blumea 46: 351–398.
  @article{Meyer2001,
    author = {Meyer, K.},
    year = {2001},
    title = {Revision of the Southeast Asian genus Melastoma},
    journal = {Blumea},
    volume = {46},
    pages = {351-398},
  }

  % Molina, J.E., and L. Struwe.  2004.  Neuburgia novocaledonica, comb. nov. and the first record of domatia in the family Loganiaceae.  Australian Systematic Botany 17: 399–406.
  @article{MolinaStruwe2004,
    author = {Molina, J. E. and L. Struwe},
    year = {2004},
    title = {Neuburgia novocaledonica},
    journal = {comb. nov. and the first record of domatia in the family Loganiaceae. Australian Systematic Botany},
    volume = {17},
    pages = {399-406},
  }

  % Molvray, M.  1997.  A Synopsis of Korthalsella (Viscaceae).  Novon 7: 268–273.
  @article{Molvray1997,
    author = {Molvray, M.},
    year = {1997},
    title = {A Synopsis of Korthalsella (Viscaceae)},
    journal = {Novon},
    volume = {7},
    pages = {268-273},
  }

  % Morat, P.  1981.  Notes sur les Graminées de la Nouvelle-Calédonie. IV-V. Candollea 36: 215–221.
  @article{Morat1981,
    author = {Morat, P.},
    year = {1981},
    title = {Notes sur les Graminées de la Nouvelle-Calédonie},
    journal = {IV-V. Candollea},
    volume = {36},
    pages = {215-221},
  }

  % Mouly, A., L. Barrabé, and D. Bruy.  2021.  Molecular phylogeny of Atractocarpus (Rubiaceae): taxonomic implications for several New Caledonian Gardenieae species. Plant Ecology and Evolution 154: 111– 120.
  @article{MoulyBarrabeBruy2021,
    author = {Mouly, A. and L. Barrabé and D. Bruy},
    year = {2021},
    title = {Molecular phylogeny of Atractocarpus (Rubiaceae): taxonomic implications for several New Caledonian Gardenieae species},
    journal = {Plant Ecology and Evolution},
    volume = {154},
    pages = {111-120},
  }

  % Noben, S. and M. Lehnert.  2013.  The genus Dicksonia (Dicksoniaceae) in the western Pacific. Phytotaxa 155: 23–34.
  @article{NobenLehnert2013,
    author = {Noben, S. and M. Lehnert},
    year = {2013},
    title = {The genus Dicksonia (Dicksoniaceae) in the western Pacific},
    journal = {Phytotaxa},
    volume = {155},
    pages = {23-34},
  }

  % Nooteboom, H.P.  1994.  Notes on Davalliaceae II. A revision of the genus Davallia. Blumea 39: 151–214.
  @article{Nooteboom1994,
    author = {Nooteboom, H. P.},
    year = {1994},
    title = {Notes on Davalliaceae II. A revision of the genus Davallia},
    journal = {Blumea},
    volume = {39},
    pages = {151-214},
  }

  % Nooteboom, H.P.  1997.  The microsoroid ferns (Polypodiaceae). Blumea 42: 261–395.
  @article{Nooteboom1997,
    author = {Nooteboom, H. P.},
    year = {1997},
    title = {The microsoroid ferns (Polypodiaceae)},
    journal = {Blumea},
    volume = {42},
    pages = {261-395},
  }

  % Neupane, S., S. Dessein, N. Wikström, P.O. Lewis, C. Long, B. Bremer, and T.J. Motley.  2015.  The HedyotisOldenlandia complex (Rubiaceae: Spermacoceae) in Asia and the Pacific: Phylogeny revisited with new generic delimitations.  Taxon 64: 299–322.
  @article{NeupaneDesseinWikstromLewisLongBremerMotley2015,
    author = {Neupane, S. and S. Dessein and N. Wikström and P. O. Lewis and C. Long and B. Bremer and T. J. Motley},
    year = {2015},
    title = {The HedyotisOldenlandia complex (Rubiaceae: Spermacoceae) in Asia and the Pacific: Phylogeny revisited with new generic delimitations},
    journal = {Taxon},
    volume = {64},
    pages = {299-322},
  }

  % Ohashi, H. and K. Ohashi.  2018.  Sohmaea, a New Genus of Leguminosae Tribe Desmodieae.  Journal of Japanese Botany 93:  155–164.
  @article{OhashiOhashi2018,
    author = {Ohashi, H. and K. Ohashi},
    year = {2018},
    title = {Sohmaea, a New Genus of Leguminosae Tribe Desmodieae},
    journal = {Journal of Japanese Botany},
    volume = {93},
    pages = {155-164},
  }

  % Ohlsen, D.J., L.R. Perrie, L.D. Shepherd, P.J. Brownsey, and M.J. Bayly.  2014.  Phylogeny of the fern family Aspleniaceae in Australasia and the south-western Pacific. Australian Systematic Botany 27: 355–371.
  @article{OhlsenPerrieShepherdBrownseyBayly2014,
    author = {Ohlsen, D. J. and L. R. Perrie and L. D. Shepherd and P. J. Brownsey and M. J. Bayly},
    year = {2014},
    title = {Phylogeny of the fern family Aspleniaceae in Australasia and the south-western Pacific},
    journal = {Australian Systematic Botany},
    volume = {27},
    pages = {355-371},
  }

  % Orchard, A.E.  2013.  The Wollastonia/Melanthera/Wedelia generic complex (Asteraceae: Ecliptinae), with particular reference to Australia and Malesia.  Nuytsia 23: 337–466.
  @article{Orchard2013,
    author = {Orchard, A. E.},
    year = {2013},
    title = {The Wollastonia/Melanthera/Wedelia generic complex (Asteraceae: Ecliptinae), with particular reference to Australia and Malesia},
    journal = {Nuytsia},
    volume = {23},
    pages = {337-466},
  }

  % Pillon, Y.  2018.  A new species of Metrosideros (Myrtaceae) from Vanuatu and notes on the genus.  Phytotaxa 347: 197–200.
  @article{Pillon2018,
    author = {Pillon, Y.},
    year = {2018},
    title = {A new species of Metrosideros (Myrtaceae) from Vanuatu and notes on the genus},
    journal = {Phytotaxa},
    volume = {347},
    pages = {197-200},
  }

  % Pillon, Y., and V. Hequet.  2019.  Two new species of Quintinia (Paracryphiaceae) with notes on the species from New Caledonia and Vanuatu.  Phytotaxa 397: 45–54.
  @article{PillonHequet2019,
    author = {Pillon, Y. and V. Hequet},
    year = {2019},
    title = {Two new species of Quintinia (Paracryphiaceae) with notes on the species from New Caledonia and Vanuatu},
    journal = {Phytotaxa},
    volume = {397},
    pages = {45-54},
  }

  % Pillon, Y., H.C.F. Hopkins, L. Barrabé, and E.A. Stacy.  2014.  A new record for Carpodetus (Rousseaceae) in Vanuatu.  New Zealand Journal of Botany 52: 449–452.
  @article{PillonHopkinsBarrabeStacy2014,
    author = {Pillon, Y. and H. C. F. Hopkins and L. Barrabé and E. A. Stacy},
    year = {2014},
    title = {A new record for Carpodetus (Rousseaceae) in Vanuatu},
    journal = {New Zealand Journal of Botany},
    volume = {52},
    pages = {449-452},
  }

  % Pillon, Y., E. Lucas, J.B. Johansen, T. Sakishima, B. Hall, S.M. Geib, and E.A. Stacy.  2015.  An expanded Metrosideros (Myrtaceae) to include Carpolepis and Tepualia based on nuclear genes.  Systematic Botany 40: 782–790.
  @article{PillonLucasJohansenSakishimaHallGeibStacy2015,
    author = {Pillon, Y. and E. Lucas and J. B. Johansen and T. Sakishima and B. Hall and S. M. Geib and E. A. Stacy},
    year = {2015},
    title = {An expanded Metrosideros (Myrtaceae) to include Carpolepis and Tepualia based on nuclear genes},
    journal = {Systematic Botany},
    volume = {40},
    pages = {782-790},
  }

  % Possley, J. and P.L. Howell. 2015. Misidentification of Microsorum scolopendria  in South Florida. American Fern Journal 105: 127–130. PPG I.  2016.  A community-derived classification for extant lycophytes and ferns. Journal of Systematics and Evolution 54: 563–603.
  @article{PossleyHowell2015,
    author = {Possley, J. and P. L. Howell},
    year = {2015},
    title = {Misidentification of Microsorum scolopendria in South Florida},
    journal = {American Fern Journal},
    pages = {127-130},
    volume = {I},
    number = {2016},
    note = {105 . PPG. A community-derived classification for extant lycophytes and ferns. Journal of Systematics and Evolution 54: 563--603},
  }

  % Pu-chiu, T.  1980.  New taxa and new combinations of the genus Sophora.  Acta Phytotaxonomica Sinica 18: 71–74.
  @article{Puchiu1980,
    author = {Pu-chiu, T.},
    year = {1980},
    title = {New taxa and new combinations of the genus Sophora},
    journal = {Acta Phytotaxonomica Sinica},
    volume = {18},
    pages = {71-74},
  }

  % Radosavljevic, A.  2019.  The rise of Cynometra (Leguminosae) and the fall of Maniltoa:  a generic recircumscription and the addition of 4 new species.  PhytoKeys 127: 1–37.
  @article{Radosavljevic2019,
    author = {Radosavljevic, A.},
    year = {2019},
    title = {The rise of Cynometra (Leguminosae) and the fall of Maniltoa: a generic recircumscription and the addition of 4 new species},
    journal = {PhytoKeys},
    volume = {127},
    pages = {1-37},
  }

  % Razafimandimbison, S.G., and B. Bremer.  2011.  Nomenclatural changes and taxonomic notes in the tribe Morindeae (Rubiaceae).  Adansonia, sér. 3, 33: 283–309.
  @article{RazafimandimbisonBremer2011,
    author = {Razafimandimbison, S. G. and B. Bremer},
    year = {2011},
    title = {Nomenclatural changes and taxonomic notes in the tribe Morindeae (Rubiaceae)},
    journal = {Adansonia, sér},
    volume = {3},
    number = {33},
    pages = {283-309},
  }

  % Rhind, P.M.  2010.  Plant Formations in the Vanuatu BioProvince.  http://terrestrial-biozones.net/ Paleotropic
  @misc{Rhind2010,
    note = {Paleotropic},
    url = {http://terrestrial-biozones.net/},
    author = {Rhind, P. M.},
    year = {2010},
    title = {Plant Formations in the Vanuatu BioProvince},
  }

  % Ricketson, J.M. and J.J. Pipoly III.  2010.   Nomenclatural transfers in the genus Myrsine (Myrsinaceae) for New Caledonia.  Journal of the Botanical Research Institute of Texas 4: 627–632.
  @article{RicketsonIII2010,
    author = {Ricketson, J. M. and J. J. Pipoly III},
    year = {2010},
    title = {Nomenclatural transfers in the genus Myrsine (Myrsinaceae) for New Caledonia},
    journal = {Journal of the Botanical Research Institute of Texas},
    volume = {4},
    pages = {627-632},
  }

  % Ricketson, J.M. and J.J. Pipoly III.  2013.  Nomenclatural transfers in the pantropical genus Myrsine (Myrsinaceae).  Novon 22: 468–472.
  @article{RicketsonIII2013,
    author = {Ricketson, J. M. and J. J. Pipoly III},
    year = {2013},
    title = {Nomenclatural transfers in the pantropical genus Myrsine (Myrsinaceae)},
    journal = {Novon},
    volume = {22},
    pages = {468-472},
  }

  % Ridsdale, C.E.  1996.  A review of Aidia s.l. (Rubiaceae) in Southeast Asia and Malesia.  Blumea 41: 135–179.
  @article{Ridsdale1996,
    author = {Ridsdale, C. E.},
    year = {1996},
    title = {A review of Aidia s.l},
    journal = {Rubiaceae) in Southeast Asia and Malesia. Blumea},
    volume = {41},
    pages = {135-179},
  }

  % Rossetto, E.F. S. and M.A. Caraballo-Ortiz.  2020.   Splitting the Pisonia birdcatcher trees: re-establishment of Ceodes and Rockia (Nyctaginaceae, Pisonieae).  PhytoKeys 152: 121-136.
  @article{RossettoCaraballoOrtiz2020,
    author = {Rossetto, E. F. S. and M. A. Caraballo-Ortiz},
    year = {2020},
    title = {Splitting the Pisonia birdcatcher trees: re-establishment of Ceodes and Rockia (Nyctaginaceae, Pisonieae)},
    journal = {PhytoKeys},
    volume = {152},
    pages = {121-136},
  }

  % Salgado, A.E.  2020.  Taxonomic and nomenclatural notes on Philippine ferns. III. Asplenium caudatum (Aspleniaceae) and ferns confused with it. Fern Gazette 21: 169–184.
  @article{Salgado2020,
    author = {Salgado, A. E.},
    year = {2020},
    title = {Taxonomic and nomenclatural notes on Philippine ferns. III. Asplenium caudatum (Aspleniaceae) and ferns confused with it},
    journal = {Fern Gazette},
    volume = {21},
    pages = {169-184},
  }

  % Salgado, A.E. and C.R. Fraser-Jenkins.  2013.  The nomenclature, typification and taxonomy of Asplenium falcatum, A. polyodon and confused species. Fern Gazette 19: 213–239.
  @article{SalgadoFraserJenkins2013,
    author = {Salgado, A. E. and C. R. Fraser-Jenkins},
    year = {2013},
    title = {The nomenclature, typification and taxonomy of Asplenium falcatum},
    journal = {A. polyodon and confused species. Fern Gazette},
    volume = {19},
    pages = {213-239},
  }

  % Schönberger, I., A.D. Wilton, P. Brownsey, L. Perrie, K.F. Boardman, I. Breitwieser, M. Cochrane, B. de Pauw, A.J. Fife, K.A. Ford, E.S. Gibb, D.S. Glenny, M.A. Korver, P.M. Novis, J.M. Prebble, D.N. Redmond, R.D. Smissen, and K. Tawiri.  2017.  Checklist of the New Zealand Flora – Ferns and Lycophytes. Lincoln, Manaaki Whenua-Landcare Research. http://dx.doi.org/10.7931/P18901
  @unpublished{SchonbergerWiltonBrownseyPerrieBoardmanBreitwieserCochranePauwFifeFordGibbGlennyKorverNovisPrebbleRedmondSmissenTawiri2017,
    doi = {10.7931/P18901},
    author = {Schönberger, I. and A. D. Wilton and P. Brownsey and L. Perrie and K. F. Boardman and I. Breitwieser and M. Cochrane and B. de Pauw and A. J. Fife and K. A. Ford and E. S. Gibb and D. S. Glenny and M. A. Korver and P. M. Novis and J. M. Prebble and D. N. Redmond and R. D. Smissen and K. Tawiri},
    year = {2017},
    title = {Checklist of the New Zealand Flora -- Ferns and Lycophytes. Lincoln, Manaaki Whenua-Landcare Research},
  }

  % Schuettpelz, E., H. Schneider, L. Huiet, M.D. Windham, K.M. Pryer.  2007.  A molecular phylogeny of the fern family Pteridaceae: Assessing overall relationships and the affinities of previously unsampled genera. Molecular Phylogenetics and Evolution 44: 1172–1185.
  @article{SchuettpelzSchneiderHuietWindhamPryer2007,
    author = {Schuettpelz, E. and H. Schneider and L. Huiet and M. D. Windham and K. M. Pryer},
    year = {2007},
    title = {A molecular phylogeny of the fern family Pteridaceae: Assessing overall relationships and the affinities of previously unsampled genera},
    journal = {Molecular Phylogenetics and Evolution},
    volume = {44},
    pages = {1172-1185},
  }

  % Setoguchi, H., and H. Ohba.  1995.  Phylogenetic relationships in Crossostylis (Rhizophoraceae) inferred from restriction site variation of chloroplast DNA.  Journal of Plant Research 108: 87–92.
  @article{SetoguchiOhba1995,
    author = {Setoguchi, H. and H. Ohba},
    year = {1995},
    title = {Phylogenetic relationships in Crossostylis (Rhizophoraceae) inferred from restriction site variation of chloroplast DNA},
    journal = {Journal of Plant Research},
    volume = {108},
    pages = {87-92},
  }

  % Setoguchi, H., H. Ohba, and H. Tobe.  1996.  Floral morphology and phylogenetc analysis in Crossostylis (Rhizophoraceae).  Journal of Plant Research 109: 7–19.
  @article{SetoguchiOhbaTobe1996,
    author = {Setoguchi, H. and H. Ohba and H. Tobe},
    year = {1996},
    title = {Floral morphology and phylogenetc analysis in Crossostylis (Rhizophoraceae)},
    journal = {Journal of Plant Research},
    volume = {109},
    pages = {7-19},
  }

  % Setoguchi, H., H. Ohba, and H. Tobe.  1998.  Evolution in Crossostylis (Rhizophoraceae) on the South Pacific Islands. Pp. 203-230 in T. Stuessy & M. Ono (eds.), Evolution and Speciation of Island Plants. Cambridge: Cambridge University Press.
  @incollection{SetoguchiOhbaTobe1998,
    author = {Setoguchi, H. and H. Ohba and H. Tobe},
    year = {1998},
    title = {Evolution in Crossostylis (Rhizophoraceae) on the South Pacific Islands},
    pages = {203-230},
    address = {Cambridge},
    publisher = {Cambridge University Press},
    editor = {T. Stuessy and M. Ono},
    booktitle = {Evolution and Speciation of Island Plants},
  }

  % Schuiteman, A. and P.B. Adams.  2011.  New combinations in Dendrobium (Orchidaceae).  Muelleria 29: 62– 68.
  @article{SchuitemanAdams2011,
    author = {Schuiteman, A. and P. B. Adams},
    year = {2011},
    title = {New combinations in Dendrobium (Orchidaceae)},
    journal = {Muelleria},
    volume = {29},
    pages = {62-68},
  }

  % Simões, A.R. and G. Staples.  2017.  Dissolution of Convolvulaceae tribe Merremieae and a new classification of the constituent genera.  Botanical Journal of the Linnean Society 183: 561–586.
  @article{SimoesStaples2017,
    author = {Simões, A. R. and G. Staples},
    year = {2017},
    title = {Dissolution of Convolvulaceae tribe Merremieae and a new classification of the constituent genera},
    journal = {Botanical Journal of the Linnean Society},
    volume = {183},
    pages = {561-586},
  }

  % Smith, A.C.  1976.  Studies of Pacific Island plants, xxxiii.  The genus Ascarina (Chloranthaceae) in the Southern Pacific.  Journal of the Arnold Arboretum 57: 405–425.
  @article{Smith1976,
    author = {Smith, A. C.},
    year = {1976},
    title = {Studies of Pacific Island plants, xxxiii. The genus Ascarina (Chloranthaceae) in the Southern Pacific},
    journal = {Journal of the Arnold Arboretum},
    volume = {57},
    pages = {405-425},
  }

  % Snow, N.  2005.  Five new combinations in Gossia (Myrtaceae) from Melanesia. Novon 15: 477–478
  @article{Snow2005,
    author = {Snow, N.},
    year = {2005},
    title = {Five new combinations in Gossia (Myrtaceae) from Melanesia},
    journal = {Novon},
    volume = {15},
    pages = {477-478},
  }

  % Snow, N., and P.G. Wilson.  2010.  New species of Eugenia and Gossia (Myrtaceae: Myrteae) from Papua New Guinea.  Telopea 12 453–461.
  @article{SnowWilson2010,
    author = {Snow, N. and P. G. Wilson},
    year = {2010},
    title = {New species of Eugenia and Gossia (Myrtaceae: Myrteae) from Papua New Guinea},
    journal = {Telopea},
    volume = {12},
    pages = {453-461},
  }

  % Snow, N.  2020.  A revision of New Caledonian Gossia N. Snow & Guymer (Myrtaceae).  Adansonia, sér. 3, 42: 131–177.
  @article{Snow2020,
    author = {Snow, N.},
    year = {2020},
    title = {A revision of New Caledonian Gossia N},
    journal = {Snow & Guymer (Myrtaceae). Adansonia, sér},
    volume = {3},
    number = {42},
    pages = {131-177},
  }

  % Soepadmo, E.  1977.  Ulmaceae. Pages 31–76 in C.G.G.J. van Steenis (ed.), Flora Malesiana. Djakarta: Noordhoff-Kolff N.V.
  @incollection{Soepadmo1977,
    author = {Soepadmo, E.},
    year = {1977},
    title = {Ulmaceae},
    pages = {31-76},
    address = {Djakarta},
    publisher = {Noordhoff-Kolff N. V},
    booktitle = {C. G. G. J. van Steenis},
    editor = {Flora Malesiana},
  }

  % Taylor, C.M., S.G. Razafimandimbison, L. Barrabé, J.G. Jardim, and M.R.V. Barbosa.  2017.  Eumachia expanded, a pantropical genus distinct from Psychotria (Rubiaceae, Palicoureeae).  Candollea 72: 289–318.
  @article{TaylorRazafimandimbisonBarrabeJardimBarbosa2017,
    author = {Taylor, C. M. and S. G. Razafimandimbison and L. Barrabé and J. G. Jardim and M. R. V. Barbosa},
    year = {2017},
    title = {Eumachia expanded, a pantropical genus distinct from Psychotria (Rubiaceae, Palicoureeae)},
    journal = {Candollea},
    volume = {72},
    pages = {289-318},
  }

  % Testo, W.L., A.R. Field, E.B. Sessa, and M. Sundue.  2019.  Phylogenetic and Morphological Analyses Support the Resurrection of Dendroconche and the Recognition of Two New Genera in Polypodiaceae Subfamily Microsoroideae. Systematic Botany 44: 1–36.
  @article{TestoFieldSessaSundue2019,
    author = {Testo, W. L. and A. R. Field and E. B. Sessa and M. Sundue},
    year = {2019},
    title = {Phylogenetic and Morphological Analyses Support the Resurrection of Dendroconche and the Recognition of Two New Genera in Polypodiaceae Subfamily Microsoroideae},
    journal = {Systematic Botany},
    volume = {44},
    pages = {1-36},
  }

  % Thomson, J.A.  2012.  Taxonomic Status of Diploid Southern Hemisphere Brackens (Pteridium: Dennstaedtiaceae). Telopea 14: 43–48.
  @article{Thomson2012,
    author = {Thomson, J. A.},
    year = {2012},
    title = {Taxonomic Status of Diploid Southern Hemisphere Brackens (Pteridium: Dennstaedtiaceae)},
    journal = {Telopea},
    volume = {14},
    pages = {43-48},
  }

  % Tsutsumi, C., X.-C. Zhang, and M. Kato.  2008. Molecular phylogeny of Davalliaceae and implications for generic classification. Systematic Botany 33: 44–48.
  @article{TsutsumiZhangKato2008,
    author = {Tsutsumi, C. and X.-C. Zhang and M. Kato},
    year = {2008},
    title = {Molecular phylogeny of Davalliaceae and implications for generic classification},
    journal = {Systematic Botany},
    volume = {33},
    pages = {44-48},
  }

  % Tsutsumi, C., C.-W. Chen, A. Larsson, Y. Hirayama, and M. Kato.  2016.  Phylogeny and classification of Davalliaceae on the basis of chloroplast and nuclear markers. Taxon 65: 1236–1248.
  @article{TsutsumiChenLarssonHirayamaKato2016,
    author = {Tsutsumi, C. and C.-W. Chen and A. Larsson and Y. Hirayama and M. Kato},
    year = {2016},
    title = {Phylogeny and classification of Davalliaceae on the basis of chloroplast and nuclear markers},
    journal = {Taxon},
    volume = {65},
    pages = {1236-1248},
  }

    % Tuiwawa, S.H., L.A. Craven, C. Sam, and M.D. Crisp.  2013.  The genus Syzygium (Myrtaceae) in Vanuatu.  Blumea 58: 53–67.
    @article{TuiwawaCravenSamCrisp2013,
      author = {Tuiwawa, S. H. and L. A. Craven and C. Sam and M. D. Crisp},
      year = {2013},
      title = {The genus Syzygium (Myrtaceae) in Vanuatu},
      journal = {Blumea},
      volume = {58},
      pages = {53-67},
    }

    % Turner, I.M.  2014.  Names of extant angiosperm species that are illegitimate homonyms of fossils.  Annales Botanici Fennici 51: 305–317.
    @article{Turner2014,
      author = {Turner, I. M.},
      year = {2014},
      title = {Names of extant angiosperm species that are illegitimate homonyms of fossils},
      journal = {Annales Botanici Fennici},
      volume = {51},
      pages = {305-317},
    }

    % Ungricht, S., J.-Y. Rasplus, and F. Kjellberg.  2003.  Nomenclature of the endemic monoecious fig trees (Moraceae: Ficus L.) of New Caledonia and Vanuatu (Pacific Ocean). Taxon 52: 319–325.
    @article{UngrichtRasplusKjellberg2003,
      author = {Ungricht, S. and J.-Y. Rasplus and F. Kjellberg},
      year = {2003},
      title = {Nomenclature of the endemic monoecious fig trees (Moraceae: Ficus L.) of New Caledonia and Vanuatu (Pacific Ocean)},
      journal = {Taxon},
      volume = {52},
      pages = {319-325},
    }

    % Utteridge, T. M.  2011.  A revision of the genus Medusanthera (Stemonuraceae, Icacinaceae s.l.). Kew Bulletin 66: 49–81.
    @article{Utteridge2011,
      author = {Utteridge, T. M.},
      year = {2011},
      title = {A revision of the genus Medusanthera (Stemonuraceae, Icacinaceae s.l.)},
      journal = {Kew Bulletin},
      volume = {66},
      pages = {49-81},
    }

    % Vermeulen, J.J., A. Schuiteman, and E.F. de Vogel.  2015.  Corrections and an addition to Vermeulen et al. (2014): two new names and a new combination in Bulbophyllum (Orchidaceae; Epidendroideae; Malaxideae).  Phytotaxa 197: 059–059.
    @article{VermeulenSchuitemanVogel2015,
      author = {Vermeulen, J. J. and A. Schuiteman and E. F. de Vogel},
      year = {2015},
      title = {Corrections and an addition to Vermeulen et al},
      journal = {2014): two new names and a new combination in Bulbophyllum (Orchidaceae; Epidendroideae; Malaxideae). Phytotaxa},
      volume = {197},
      pages = {059-059},
    }

    % Wagner, W.L., and D.H. Lorence.  2011.  A nomenclator of Pacific oceanic island Phyllanthus (Phyllanthaceae), including Glochidion.  PhytoKeys 4: 67–94.
    @article{WagnerLorence2011,
      author = {Wagner, W. L. and D. H. Lorence},
      year = {2011},
      title = {A nomenclator of Pacific oceanic island Phyllanthus (Phyllanthaceae), including Glochidion},
      journal = {PhytoKeys},
      volume = {4},
      pages = {67-94},
    }

    % Wang, L., Z.-Q. Wu, Q.-P. Xiang, J. Heinrichs, H. Schneider, and X.-C. Zhang.  2010.  A molecular phylogeny and a revised classification of tribe Lepisoreae (Polypodiaceae) based on an analysis of four plastid DNA regions. Botanical Journal of the Linnean Society 162: 28–38.
    @article{WangWuXiangHeinrichsSchneiderZhang2010,
      author = {Wang, L. and Z.-Q. Wu and Q.-P. Xiang and J. Heinrichs and H. Schneider and X.-C. Zhang},
      year = {2010},
      title = {A molecular phylogeny and a revised classification of tribe Lepisoreae (Polypodiaceae) based on an analysis of four plastid DNA regions},
      journal = {Botanical Journal of the Linnean Society},
      volume = {162},
      pages = {28-38},
    }

    % Webster, G.L.  1986.  A revision of Phyllanthus (Euphorbiaceae) in Eastern Melanesia.  Plant Science 40: 88– 105.
    @article{Webster1986,
      author = {Webster, G. L.},
      year = {1986},
      title = {A revision of Phyllanthus (Euphorbiaceae) in Eastern Melanesia},
      journal = {Plant Science},
      volume = {40},
      pages = {88-105},
    }

    % Wepfer, P.H. and H.P. Linder.  2014.  The taxonomy of Flagellaria (Flagellariaceae).  Australian Systematic Botany 27: 159–179.
    @article{WepferLinder2014,
      author = {Wepfer, P. H. and H. P. Linder},
      year = {2014},
      title = {The taxonomy of Flagellaria (Flagellariaceae)},
      journal = {Australian Systematic Botany},
      volume = {27},
      pages = {159-179},
    }

    % White, R.A. and M.D. Turner.  1988.  Calochlaena, a new genus of Dicksonioid ferns. American Fern Journal 78: 86–95.
    @article{WhiteTurner1988,
      author = {White, R. A. and M. D. Turner},
      year = {1988},
      title = {Calochlaena, a new genus of Dicksonioid ferns},
      journal = {American Fern Journal},
      volume = {78},
      pages = {86-95},
    }

    % Wilkins, C.F., and B.A. Whitlock. 2011.  A revision of Commersonia including Rulingia (Malvaceae s.l. or Byttneriaceae).  Australian Systematic Botany 24: 226–283.
    @article{WilkinsWhitlock2011,
      author = {Wilkins, C. F. and B. A. Whitlock},
      year = {2011},
      title = {A revision of Commersonia including Rulingia (Malvaceae s.l. or Byttneriaceae)},
      journal = {Australian Systematic Botany},
      volume = {24},
      pages = {226-283},
    }

    % Wilmot-Dear, C.M.  1990.  A revision of Mucuna (Leguminosae: Phaseoleae) in the Pacific.  Kew Bulletin 45: 1– 35.
    @article{WilmotDear1990,
      author = {Wilmot-Dear, C. M.},
      year = {1990},
      title = {A revision of Mucuna (Leguminosae: Phaseoleae) in the Pacific},
      journal = {Kew Bulletin},
      volume = {45},
      pages = {1-35},
    }

    % Wilmot-Dear, C.M.  2009.  Urticaceae for the non-specialist: Identification in the Flora Malesiana region, Indochina and Thailand.  Blumea 54: 233–241.
    @article{WilmotDear2009,
      author = {Wilmot-Dear, C. M.},
      year = {2009},
      title = {Urticaceae for the non-specialist: Identification in the Flora Malesiana region, Indochina and Thailand},
      journal = {Blumea},
      volume = {54},
      pages = {233-241},
    }

    % Wilmot-Dear, C.M., and I. Friis.  2010.  Cypholophus anisoneurus comb. nov. — an endemic species of Urticaceae from Vanuatu and Solomon Islands hitherto misplaced in Boehmeria.  Nordic Journal of Botany 28: 285–287.
    @article{WilmotDearFriis2010,
      author = {Wilmot-Dear, C. M. and I. Friis},
      year = {2010},
      title = {Cypholophus anisoneurus comb},
      journal = {nov. --- an endemic species of Urticaceae from Vanuatu and Solomon Islands hitherto misplaced in Boehmeria. Nordic Journal of Botany},
      volume = {28},
      pages = {285-287},
    }

    % Wilmot-Dear, C.M., and I. Friis.  2013.  The Old World species of Boehmeria (Urticaceae, tribus Boehmerieae). A taxonomic revision.  Blumea 58, 2013: 85–216.
    @article{WilmotDearFriis2013,
      author = {Wilmot-Dear, C. M. and I. Friis},
      year = {2013},
      title = {The Old World species of Boehmeria (Urticaceae, tribus Boehmerieae)},
      journal = {A taxonomic revision. Blumea},
      volume = {58},
      number = {2013},
      pages = {85-216},
    }

    % Wilson, K.L. 1988.  Polygonum sensu lato (Polygonaceae) in Australia.  Telopea: 177–182.
    @book{Wilson1988,
      author = {Wilson, K. L.},
      year = {1988},
      title = {Polygonum sensu lato (Polygonaceae) in Australia},
      publisher = {177--182},
      address = {Telopea},
    }

    % Wolf, P.G., C.A. Rowe, S.P. Kinosian, J.P. Der, P.J. Lockhart, L.D. Shepherd, P.A. McLenachan, and J.A. Thomson.  2019.  Worldwide relationships in the fern genus Pteridium (bracken) based on nuclear genome markers. American Journal of Botany 106: 1–12.
    @article{WolfRoweKinosianDerLockhartShepherdMcLenachanThomson2019,
      author = {Wolf, P. G. and C. A. Rowe and S. P. Kinosian and J. P. Der and P. J. Lockhart and L. D. Shepherd and P. A. McLenachan and J. A. Thomson},
      year = {2019},
      title = {Worldwide relationships in the fern genus Pteridium (bracken) based on nuclear genome markers},
      journal = {American Journal of Botany},
      volume = {106},
      pages = {1-12},
    }

    % Yukawa, T.  2003.  Studies of the Orchid Flroa of Vanuatu: II.  Phreatia vanuatensis, a new species.  Acta Phytotaxonomica et Geobotanica 54: 105–107.
    @article{Yukawa2003,
      author = {Yukawa, T.},
      year = {2003},
      title = {Studies of the Orchid Flroa of Vanuatu: II. Phreatia vanuatensis, a new species},
      journal = {Acta Phytotaxonomica et Geobotanica},
      volume = {54},
      pages = {105-107},
    }

    % Xu, K.-W., X.-M. Zhou, Q.-Y. Yin. L. Zhang, N.T. Lu, R. Knapp, T.T. Luong, H. He, Q. Fan, W.-Y. Zhao, X.-F. Gao, W.-B. Liao, L.-B. Zhang.  2018.  A global plastid phylogeny uncovers extensive cryptic speciation in the fern genus Hymenasplenium (Aspleniaceae). Molecular Phylogenetics and Evolution 127: 203– 216.
    @article{XuZhouZhangLuKnappLuongHeFanZhaoGaoLiaoZhang2018,
      author = {Xu, K.-W. and X.-M. Zhou and Q.-Y. Yin L. Zhang and N. T. Lu and R. Knapp and T. T. Luong and H. He and Q. Fan and W.-Y. Zhao and X.-F. Gao and W.-B. Liao and L.-B. Zhang},
      year = {2018},
      title = {A global plastid phylogeny uncovers extensive cryptic speciation in the fern genus Hymenasplenium (Aspleniaceae)},
      journal = {Molecular Phylogenetics and Evolution},
      volume = {127},
      pages = {203-216},
    }

    % Xu, K.-W., D. Lorence, K.R. Wood, W.-B. Liao, and L.-B. Zhang.  2019.  A revision of the Hymenasplenium unilaterale subclade (Aspleniaceae; Pteridophyta) with the description of nine new species. Phytotaxa 419: 1–27.
    @article{XuLorenceWoodLiaoZhang2019,
      author = {Xu, K.-W. and D. Lorence and K. R. Wood and W.-B. Liao and L.-B. Zhang},
      year = {2019},
      title = {A revision of the Hymenasplenium unilaterale subclade (Aspleniaceae; Pteridophyta) with the description of nine new species},
      journal = {Phytotaxa},
      volume = {419},
      pages = {1-27},
    }

    % Zona, S. and D. Fuller.  1999.  A Revision of Veitchia (Arecaceae-Arecoideae).  Harvard Papers in Botany 4: 543–560.
    @article{ZonaFuller1999,
      author = {Zona, S. and D. Fuller},
      year = {1999},
      title = {A Revision of Veitchia (Arecaceae-Arecoideae)},
      journal = {Harvard Papers in Botany},
      volume = {4},
      pages = {543-560},
    }`
  const reader = new TinyBibReader(biblio)
  expect(reader.citeKeys.length).toEqual(189)
})

test('raw authors and editors are read', () => {
  const bib = new TinyBibReader(`@ARTICLE{Grady2019-dn,
    title = "Emotions in storybooks: A comparison of storybooks that represent ethnic and racial groups in the United States",
    author = "Grady, Jessica Stoltzfus and Her, Malina and Moreno, Geena and Perez, Catherine and Yelinek, Jillian",
    editor = "Perez, Catherine and Yelinek, Jillian",
    journal = "Psychol. Pop. Media Cult.",
    publisher = "American Psychological Association (APA)",
    volume = 8,
    number = 3,
    pages = "207--217",
    month = jul,
    year = 2019,
    language = "en"
    }

    @INCOLLECTION{Bedenel2019-vg,
    title = "Probability estimation by an adapted genetic algorithm in web insurance",
    booktitle = "Lecture Notes in Computer Science",
    author = "Bedenel, Anne-Lise and Jourdan, Laetitia and Biernacki, Christophe",
    publisher = "Springer International Publishing",
    pages = "225--240",
    series = "Lecture notes in computer science",
    year = 2019,
    address = "Cham",
    copyright = "https://www.springernature.com/gp/researchers/text-and-data-mining"
    }`)

  let json = bib.bibliography

  expect(json[bib.citeKeys[0]].author).toEqual('Grady, Jessica Stoltzfus and Her, Malina and Moreno, Geena and Perez, Catherine and Yelinek, Jillian')
  expect(json[bib.citeKeys[0]].editor).toEqual('Perez, Catherine and Yelinek, Jillian')
  expect(json[bib.citeKeys[1]].author).toEqual('Bedenel, Anne-Lise and Jourdan, Laetitia and Biernacki, Christophe')
})

test('namesExtraction', () => {
  const bib = new TinyBibReader(`@ARTICLE{Grady2019-dn,
    title = "Emotions in storybooks: A comparison of storybooks that represent ethnic and racial groups in the United States",
    author = "Grady, Jessica Stoltzfus and van Beethoven, Ludwig and de Stoner, Jr, Winifred Sackville and Marteen Fredrik Adriaan ding de la Trumppert and مهدي N\\"allen and henQuq, jr, Mathize",
    editor = "Perez, Catherine and Yelinek, Jillian",
    journal = "Psychol. Pop. Media Cult.",
    publisher = "American Psychological Association (APA)",
    volume = 8,
    number = 3,
    pages = "207--217",
    month = jul,
    year = 2019,
    language = "en" }`)

  let names = null

  names = bib.extractNames('Perez, Catherine and van Yelinek, Jillian')
  expect(names[0].first).toEqual(['Catherine'])
  expect(names[0].last).toEqual(['Perez'])
  expect(names[1].first).toEqual(['Jillian'])
  expect(names[1].vons).toEqual(['van'])
  expect(names[1].last).toEqual(['Yelinek'])

  names = bib.extractNames('Grady, Jessica Stoltzfus and ding de la Trumppert, III, Marteen Fredrik Adriaan')
  expect(names[0].first).toEqual(['Jessica', 'Stoltzfus'])
  expect(names[0].last).toEqual(['Grady'])
  expect(names[1].first).toEqual(['Marteen', 'Fredrik', 'Adriaan'])
  expect(names[1].last).toEqual(['Trumppert'])
  expect(names[1].vons).toEqual(['ding', 'de', 'la'])
  expect(names[1].jrs).toEqual(['III'])
})

const bibtex = `@article{einstein,
  author = {Albert Einstein},
  title = "The true about {T}ree",
  journaltitle = {Annalen der {P}hysik},
  year = {1905},
  volume = {322},
  number = {10},
  pages = {891-921}
}

@article{COCKETT2016,
title = {SimPEG in 2016: An open source framework for simulation and gradient based parameter estimation in geophysical applications},
journal = {Computers & Geosciences},
volume = {85},
pages = {142-154},
year = {2016},
issn = {0098-3004},
doi = {https://doi.org/10.1016/j.cageo.2015.09.016},
url = {https://www.sciencedirect.com/science/article/pii/S009830041530056X},
author = {Rowan Cockett and Seogi Kang and Lindsey J. Heagy and Adam Pidlisecky and Douglas W. Oldenburg},
keywords = {Geophysics, Numerical modeling, Inversion, Electromagnetics, Sensitivities, Object-oriented programming},
abstract = {Inverse modeling is a powerful tool for extracting information about the subsurface from geophysical data. Geophysical inverse problems are inherently multidisciplinary, requiring elements from the relevant physics, numerical simulation, and optimization, as well as knowledge of the geologic setting, and a comprehension of the interplay between all of these elements. The development and advancement of inversion methodologies can be enabled by a framework that supports experimentation, is flexible and extensible, and allows the knowledge generated to be captured and shared. The goal of this paper is to propose a framework that supports many different types of geophysical forward simulations and deterministic inverse problems. Additionally, we provide an open source implementation of this framework in Python called SimPEG (Simulation and Parameter Estimation in Geophysics, http://simpeg.xyz). Included in SimPEG are staggered grid, mimetic finite volume discretizations on a number of structured and semi-structured meshes, convex optimization programs, inversion routines, model parameterizations, useful utility codes, and interfaces to standard numerical solver packages. The framework and implementation are modular, allowing the user to explore, experiment with, and iterate over a variety of approaches to the inverse problem. SimPEG provides an extensible, documented, and well-tested framework for inverting many types of geophysical data and thereby helping to answer questions in geoscience applications. Throughout the paper we use a generic direct current resistivity problem to illustrate the framework and functionality of SimPEG.}
}

@article{COCKETT2015,
title = {SimPEG: An open source framework for simulation and gradient based parameter estimation in geophysical applications},
journal = {Computers & Geosciences},
volume = {85},
pages = {142-154},
year = {2015},
issn = {0098-3004},
doi = {https://doi.org/10.1016/j.cageo.2015.09.015},
url = {https://www.sciencedirect.com/science/article/pii/S009830041530056X},
author = {Rowan Cockett and Seogi Kang and Lindsey J. Heagy and Adam Pidlisecky and Douglas W. Oldenburg},
keywords = {Geophysics, Numerical modeling, Inversion, Electromagnetics, Sensitivities, Object-oriented programming},
abstract = {Inverse modeling is a powerful tool for extracting information about the subsurface from geophysical data. Geophysical inverse problems are inherently multidisciplinary, requiring elements from the relevant physics, numerical simulation, and optimization, as well as knowledge of the geologic setting, and a comprehension of the interplay between all of these elements. The development and advancement of inversion methodologies can be enabled by a framework that supports experimentation, is flexible and extensible, and allows the knowledge generated to be captured and shared. The goal of this paper is to propose a framework that supports many different types of geophysical forward simulations and deterministic inverse problems. Additionally, we provide an open source implementation of this framework in Python called SimPEG (Simulation and Parameter Estimation in Geophysics, http://simpeg.xyz). Included in SimPEG are staggered grid, mimetic finite volume discretizations on a number of structured and semi-structured meshes, convex optimization programs, inversion routines, model parameterizations, useful utility codes, and interfaces to standard numerical solver packages. The framework and implementation are modular, allowing the user to explore, experiment with, and iterate over a variety of approaches to the inverse problem. SimPEG provides an extensible, documented, and well-tested framework for inverting many types of geophysical data and thereby helping to answer questions in geoscience applications. Throughout the paper we use a generic direct current resistivity problem to illustrate the framework and functionality of SimPEG.}
}


  @misc{doe2012pc, howpublished="personal communication", author="Doe, John", date="2012"}

@article{nar4673,
    author = {Thompson, Julie D. and Higgins, Desmond G. and Gibson, Toby J.},
    title = {CLUSTAL W: improving the sensitivity of progressive multiple sequence alignment through sequence weighting, position-specific gap penalties and weight matrix choice},
    journal = {Nucleic Acids Research},
    volume = {22},
    number = {22},
    pages = {4673-4680},
    year = {1994},
    month = {11},
    abstract = {The sensitivity of the commonly used progressive multiple sequence alignment method has been greatly improved for the alignment of divergent protein sequences. Firstly, individual weights are assigned to each sequence in a partial alignment in order to downweight near-duplicate sequences and up-weight the most divergent ones. Secondly, amino acid substitution matrices are varied at different alignment stages according to the divergence of the sequences to be aligned. Thirdly, residue-specific gap penalties and locally reduced gap penalties in hydrophilic regions encourage new gaps in potential loop regions rather than regular secondary structure. Fourthly, positions in early alignments where gaps have been opened receive locally reduced gap penalties to encourage the opening up of new gaps at these positions. These modifications are incorporated into a new program, CLUSTAL W which is freely available.},
    issn = {0305-1048},
    doi = {10.1093/nar/22.22.4673},
    url = {https://doi.org/10.1093/nar/22.22.4673},
    eprint = {https://academic.oup.com/nar/article-pdf/22/22/4673/7122285/22-22-4673.pdf},
}

@article{HEAGY2017,
title = {A framework for simulation and inversion in electromagnetics},
journal = {Computers & Geosciences},
volume = {107},
pages = {1-19},
year = {2017},
issn = {0098-3004},
doi = {https://doi.org/10.1016/j.cageo.2017.06.018},
url = {https://www.sciencedirect.com/science/article/pii/S0098300416303946},
author = {Lindsey J. Heagy and Rowan Cockett and Seogi Kang and Gudni K. Rosenkjaer and Douglas W. Oldenburg},
keywords = {Geophysics, Numerical modelling, Finite volume, Sensitivities, Object oriented},
abstract = {Simulations and inversions of electromagnetic geophysical data are paramount for discerning meaningful information about the subsurface from these data. Depending on the nature of the source electromagnetic experiments may be classified as time-domain or frequency-domain. Multiple heterogeneous and sometimes anisotropic physical properties, including electrical conductivity and magnetic permeability, may need be considered in a simulation. Depending on what one wants to accomplish in an inversion, the parameters which one inverts for may be a voxel-based description of the earth or some parametric representation that must be mapped onto a simulation mesh. Each of these permutations of the electromagnetic problem has implications in a numerical implementation of the forward simulation as well as in the computation of the sensitivities, which are required when considering gradient-based inversions. This paper proposes a framework for organizing and implementing electromagnetic simulations and gradient-based inversions in a modular, extensible fashion. We take an object-oriented approach for defining and organizing each of the necessary elements in an electromagnetic simulation, including: the physical properties, sources, formulation of the discrete problem to be solved, the resulting fields and fluxes, and receivers used to sample to the electromagnetic responses. A corresponding implementation is provided as part of the open source simulation and parameter estimation project SimPEG (http://simpeg.xyz). The application of the framework is demonstrated through two synthetic examples and one field example. The first example shows the application of the common framework for 1D time domain and frequency domain inversions. The second is a field example that demonstrates a 1D inversion of electromagnetic data collected over the Bookpurnong Irrigation District in Australia. The final example is a 3D example which shows how the modular implementation is used to compute the sensitivity for a parametric model where a transmitter is positioned inside a steel cased well.}
}

@book{texbook,
author = {Donald E. Knuth},
year = {1986},
title = {The TeX Book},
publisher = {Addison-Wesley Professional}
}

@book{latexcompanion,
author = {Frank Mittelbach and Michel Gossens
        and Johannes Braams and David Carlisle
        and Chris Rowley},
year = {2004},
title = {The LaTeX Companion},
publisher = {Addison-Wesley Professional},
edition = {2}
}


@book{latex2e,
author = {Leslie Lamport},
year = {1994},
title = {LaTeX: a Document Preparation System},
publisher = { Addison Wesley },
address = { Massachusetts },
edition = { 2}
}

@article{knuth1984,
  title = { Literate Programming },
  author = { Donald E.Knuth },
  journal = { The Computer Journal },
  volume = { 27},
  number = { 2},
  pages = { 97--111 },
  year = { 1984},
  publisher = { Oxford University Press }
}

@inproceedings{lesk1977,
  title = { Computer Typesetting of Technical Journals on UNIX },
author={Michael Lesk and Brian Kernighan},
booktitle={Proceedings of American Federation of
         Information Processing Societies: 1977
         National Computer Conference},
pages={879--888},
year={1977},
address={Dallas, Texas}
}

@InProceedings{realscience,
        author    = {Marteen Fredrik Adriaan ding de la Trumppert and مهدي N"allen and henQuq, jr, Mathize},
        title     = {You Won't Believe This Proof That P gtreqqless NP Using Super-Turing Computation Near Big Black Holes},
        booktitle = {Book of Qeq},
        month     = {September},
        year      = {2001},
        address   = {Dordrecht},
        publisher = {Willems Uitgeverij},
        url       = {https://github.com/digitalheir/},
        pages     = {6--9}
      }

      @ARTICLE{ARTICLE1,
AUTHOR="John Doe",
TITLE="Title",
JOURNAL="Journal",
YEAR="2017",
}

@BOOK{BOOK,
AUTHOR={John Doe and Jack Due},
TITLE="The Book without Title",
PUBLISHER="Dummy Publisher",
YEAR="2100",
}

@BOOK{BOOK2,
AUTHOR={John Doe and Jack Due and Jimmy Dee},
TITLE="The Book without Title",
PUBLISHER="Dummy Publisher",
YEAR="2100",
}

@INBOOK{booknoauthornoreditor,
TITLE="The Book without Title",
PUBLISHER="Dummy Publisher",
YEAR="2100",
PAGES="100-200",
}

@MISC{WEBSITE,
HOWPUBLISHED = "http://example.com",
URL = "http://example.com",
AUTHOR = "Intel",
TITLE = "Example Website",
MONTH = "Dec",
YEAR = "1988",
NOTE = "Accessed on 2012-11-11"
}
`

const bibtexJson = new TinyBibReader(bibtex)

test('italicize text', () => {
  let italicFormat = null
  italicFormat = new TinyBibFormatter(bibtexJson, { style: 'apa', format: "text" })
  expect(italicFormat.italicize("a")).toEqual('a')
  italicFormat = new TinyBibFormatter(bibtexJson, { style: 'apa', format: "markdown" })
  expect(italicFormat.italicize("a")).toEqual('*a*')
  italicFormat = new TinyBibFormatter(bibtexJson, { style: 'apa', format: "html" })
  expect(italicFormat.italicize("a")).toEqual('<i>a</i>')
})

test('citeKeys extraction', () => {
  expect(bibtexJson.citeKeys).toEqual(['einstein', 'cockett2016', 'cockett2015', 'doe2012pc', 'nar4673', 'heagy2017', 'texbook', 'latexcompanion', 'latex2e', 'knuth1984', 'lesk1977', 'realscience', 'article1', 'book', 'book2', 'booknoauthornoreditor', 'website'])
})

let einstein = bibtexJson.bibliography['einstein']
let cockett2015 = bibtexJson.bibliography['cockett2015']

test('citation fields', () => {
  expect(einstein.year).toEqual("1905")
  expect(einstein.author).toEqual("Albert Einstein")

  expect(cockett2015.year).toEqual("2015")
  expect(cockett2015.author).toEqual("Rowan Cockett and Seogi Kang and Lindsey J. Heagy and Adam Pidlisecky and Douglas W. Oldenburg")
})

const bibApa = new TinyBibFormatter(bibtexJson.bibliography, { style: 'apa', format: 'text' })
const bibHarvard = new TinyBibFormatter(bibtexJson.bibliography, { style: 'harvard', format: 'html' })

test('parse code segment', () => {
  let parsed = null
  parsed = bibApa.parseCodeSegment("e.g. @cockett2015, pg. 22")
  expect(parsed.prefix).toEqual("e.g.")
  expect(parsed.citekey).toEqual("cockett2015")
  expect(parsed.suffix).toEqual(", pg. 22")
  expect(parsed.yearOnly).toBe(false)

  parsed = bibApa.parseCodeSegment("e.g. @cockett2015[pg. 22]")
  expect(parsed.prefix).toEqual("e.g.")
  expect(parsed.citekey).toEqual("cockett2015")
  expect(parsed.suffix).toEqual("pg. 22")
  expect(parsed.yearOnly).toBe(false)

  parsed = bibApa.parseCodeSegment("e.g. -@cockett2015[pg. 22]")
  expect(parsed.prefix).toEqual("e.g.")
  expect(parsed.citekey).toEqual("cockett2015")
  expect(parsed.suffix).toEqual("pg. 22")
  expect(parsed.yearOnly).toBe(true)
})

test('in-text narrative', () => {
  expect(bibApa.codeToCitation('@COCKETT2015')).toEqual('Cockett et al. (2015)')

  expect(bibApa.codeToCitation('@nar4673')).toEqual('Thompson et al. (1994)')

  expect(bibApa.codeToCitation('@BOOK')).toEqual('Doe & Due (2100)')

  expect(bibApa.codeToCitation('@book2')).toEqual('Doe et al. (2100)')
  expect(bibApa.codeToCitation('@booknoauthornoreditor')).toEqual('The Book without Title (2100)')
  expect(bibApa.codeToCitation('@website')).toEqual('Intel (1988)')

  expect(bibHarvard.codeToCitation('@nar4673')).toEqual('Thompson, Higgins and Gibson (1994)')
  expect(bibHarvard.codeToCitation('@book')).toEqual('Doe and Due (2100)')
  expect(bibHarvard.codeToCitation('@book2')).toEqual('Doe, Due and Dee (2100)')
  expect(bibHarvard.codeToCitation('@booknoauthornoreditor')).toEqual('<i>The Book without Title</i> (2100)')
  expect(bibHarvard.codeToCitation('@website')).toEqual('Intel (1988)')

})

test('in-text parenthetical', () => {
  expect(bibApa.codeToCitation('[@cockett2015]')).toEqual('(Cockett et al., 2015)')
})

test('in-text multiple parenthetical', () => {
  expect(bibApa.codeToCitation('[@cockett2015; @heagy2017]')).toEqual('(Cockett et al., 2015; Heagy et al., 2017)')
})
test('in-text parenthetical year only', () => {
  expect(bibApa.codeToCitation('[-@cockett2015]')).toEqual('(2015)')
})
test('in-text parenthetical year only prefix and suffix', () => {
  expect(bibApa.codeToCitation('[e.g. -@cockett2015, pg. 25]')).toEqual('(e.g. 2015, pg. 25)')
})
test('in-text parenthetical prefix and suffix', () => {
  expect(bibApa.codeToCitation('[e.g. @cockett2015, pg. 22]')).toEqual('(e.g. Cockett et al., 2015, pg. 22)')
})
test('in-text narrative with suffix', () => {
  expect(bibApa.codeToCitation('@cockett2015[pg. 22]')).toEqual('Cockett et al. (2015, pg. 22)')
})

test('text transformation', () => {
  const text = `
  @cockett2015
  Parenthetical
  [@cockett2015]
  abc [@cockett2015] abc
  abc [-@cockett2015] abc
  abc [@cockett2015; -@cockett2016] abc
  abc [e.g. @cockett2015, pg. 22] abc
  abc [e.g. @cockett2015, pg. 22; cf. @cockett2016, chap. 6] abc

  abc [nonsense]

  Narrative
  abc @cockett2016 blah
  abc @cockett2015 blah

  Narrative with suffix
  abc @cockett2015[pg. 22] abc
  abc @cockett2015 [pg. 26] abc`

  const expectedTransformedText = `
  Cockett et al. (2015)
  Parenthetical
  (Cockett et al., 2015)
  abc (Cockett et al., 2015) abc
  abc (2015) abc
  abc (Cockett et al., 2015; 2016) abc
  abc (e.g. Cockett et al., 2015, pg. 22) abc
  abc (e.g. Cockett et al., 2015, pg. 22; cf. Cockett et al., 2016, chap. 6) abc

  abc [nonsense]

  Narrative
  abc Cockett et al. (2016) blah
  abc Cockett et al. (2015) blah

  Narrative with suffix
  abc Cockett et al. (2015, pg. 22) abc
  abc Cockett et al. (2015, pg. 26) abc`

  const expectedTransformedTextMD = `
  Cockett *et al.* (2015)
  Parenthetical
  (Cockett *et al.*, 2015)
  abc (Cockett *et al.*, 2015) abc
  abc (2015) abc
  abc (Cockett *et al.*, 2015; 2016) abc
  abc (e.g. Cockett *et al.*, 2015, pg. 22) abc
  abc (e.g. Cockett *et al.*, 2015, pg. 22; cf. Cockett *et al.*, 2016, chap. 6) abc

  abc [nonsense]

  Narrative
  abc Cockett *et al.* (2016) blah
  abc Cockett *et al.* (2015) blah

  Narrative with suffix
  abc Cockett *et al.* (2015, pg. 22) abc
  abc Cockett *et al.* (2015, pg. 26) abc`

  const expectedTransformedTextHTML = `
  Cockett <i>et al.</i> (2015)
  Parenthetical
  (Cockett <i>et al.</i>, 2015)
  abc (Cockett <i>et al.</i>, 2015) abc
  abc (2015) abc
  abc (Cockett <i>et al.</i>, 2015; 2016) abc
  abc (e.g. Cockett <i>et al.</i>, 2015, pg. 22) abc
  abc (e.g. Cockett <i>et al.</i>, 2015, pg. 22; cf. Cockett <i>et al.</i>, 2016, chap. 6) abc

  abc [nonsense]

  Narrative
  abc Cockett <i>et al.</i> (2016) blah
  abc Cockett <i>et al.</i> (2015) blah

  Narrative with suffix
  abc Cockett <i>et al.</i> (2015, pg. 22) abc
  abc Cockett <i>et al.</i> (2015, pg. 26) abc`

  const expectedTransformedTextHTMLwithCallback = `
  <a href='#cite-cockett2015'>Cockett <i>et al.</i> (2015)</a>
  Parenthetical
  (<a href='#cite-cockett2015'>Cockett <i>et al.</i>, 2015</a>)
  abc (<a href='#cite-cockett2015'>Cockett <i>et al.</i>, 2015</a>) abc
  abc (<a href='#cite-cockett2015'>2015</a>) abc
  abc (<a href='#cite-cockett2015'>Cockett <i>et al.</i>, 2015</a>; <a href='#cite-cockett2016'>2016</a>) abc
  abc (<a href='#cite-cockett2015'>e.g. Cockett <i>et al.</i>, 2015, pg. 22</a>) abc
  abc (<a href='#cite-cockett2015'>e.g. Cockett <i>et al.</i>, 2015, pg. 22</a>; <a href='#cite-cockett2016'>cf. Cockett <i>et al.</i>, 2016, chap. 6</a>) abc

  abc [nonsense]

  Narrative
  abc <a href='#cite-cockett2016'>Cockett <i>et al.</i> (2016)</a> blah
  abc <a href='#cite-cockett2015'>Cockett <i>et al.</i> (2015)</a> blah

  Narrative with suffix
  abc <a href='#cite-cockett2015'>Cockett <i>et al.</i> (2015, pg. 22)</a> abc
  abc <a href='#cite-cockett2015'>Cockett <i>et al.</i> (2015, pg. 26)</a> abc`

  let transformedText = null

  transformedText = bibApa.transformInTextCitations("test")
  expect(transformedText).toEqual("test")

  transformedText = bibApa.transformInTextCitations(text)
  expect(transformedText).toEqual(expectedTransformedText)

  let format = new TinyBibFormatter(bibtexJson.bibliography, { style: 'apa', format: "markdown" })
  transformedText = format.transformInTextCitations(text)
  expect(transformedText).toEqual(expectedTransformedTextMD)

  format = new TinyBibFormatter(bibtexJson.bibliography, { style: 'apa', format: "html" })
  transformedText = format.transformInTextCitations(text)
  expect(transformedText).toEqual(expectedTransformedTextHTML)

  format = new TinyBibFormatter(bibtexJson.bibliography, { style: 'apa', format: "html" })
  transformedText = format.transformInTextCitations(text, (citekey) => {
    return { prefix: '<a href=\'#cite-' + citekey + '\'>', suffix: '</a>' }
  })
  expect(transformedText).toEqual(expectedTransformedTextHTMLwithCallback)
})

test('APA inReferenceAuthors', () => {
  const reader = new TinyBibReader('@ARTICLE{Grady2019-dn, title = "Emotions in storybooks: A comparison of storybooks that represent ethnic and racial groups in the United States", author = "Grady, Jessica Stoltzfus and Her, Malina and Moreno, Geena and Perez, Catherine and Yelinek, Jillian", journal = "Psychol. Pop. Media Cult.", publisher = "American Psychological Association (APA)", volume = 8, number = 3, pages = "207--217", month = jul, year = 2019, language = "en" }')
  const renderApa = new TinyBibFormatter(reader.bibliography, { style: 'apa', format: "text" })

  expect(renderApa.getAuthorsInReference('Grady2019-dn')).toBe('Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J.')
})

test('APA references', () => {
  for (const item of bib2citeAPA) {
    const reader = new TinyBibReader(item.bib)
    const renderApa = new TinyBibFormatter(reader.bibliography, { style: 'apa', format: "text" })
    const renderHarvard = new TinyBibFormatter(reader.bibliography, { style: 'harvard', format: "text" })
    const citeKey = reader.citeKeys[0]

    let resu = renderApa.getFullReference(citeKey)
    if (resu != item.apa) {
      for (let I = 0; I < resu.length; I++) {
        const element = resu[I];
        if (element != item.apa[I]) {
          console.log("DIFF------", element)
        }
        else {
          console.log("SAME", element)
        }
      }
    }

    expect(renderApa.getFullReference(citeKey)).toBe(item.apa)
    //expect(renderHarvard.getAuthorsInReference(citeKey)).toBe(item.harvard)
  }
})

let extendedBibTeXExamples = `
@string{anch-ie = {Angew.~Chem. Int.~Ed.}}
@string{cup     = {Cambridge University Press}}
@string{dtv     = {Deutscher Taschenbuch-Verlag}}
@string{hup     = {Harvard University Press}}
@string{jams    = {J.~Amer. Math. Soc.}}
@string{jchph   = {J.~Chem. Phys.}}
@string{jomch   = {J.~Organomet. Chem.}}
@string{pup     = {Princeton University Press}}

@incollection{westfahl:space,
  author       = {Westfahl, Gary},
  title        = {The True Frontier},
  subtitle     = {Confronting and Avoiding the Realities of Space in {American}
                  Science Fiction Films},
  pages        = {55-65},
  crossref     = {westfahl:frontier},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {True Frontier, The},
  annotation   = {A cross-referenced article from a \texttt{collection}. This is
                  an \texttt{incollection} entry with a \texttt{crossref}
                  field. Note the \texttt{subtitle} and \texttt{indextitle}
                  fields},
}

@set{set,
  entryset     = {herrmann,aksin,yoon},
  annotation   = {A \texttt{set} with three members.},
}

@set{stdmodel,
  entryset     = {glashow,weinberg,salam},
  annotation   = {A \texttt{set} with three members discussing the standard
                  model of particle physics.},
}

@article{aksin,
  author       = {Aks{\i}n, {\"O}zge and T{\"u}rkmen, Hayati and Artok, Levent
                  and {\c{C}}etinkaya, Bekir and Ni, Chaoying and
                  B{\"u}y{\"u}kg{\"u}ng{\"o}r, Orhan and {\"O}zkal, Erhan},
  title        = {Effect of immobilization on catalytic characteristics of
                  saturated {Pd-N}-heterocyclic carbenes in {Mizoroki-Heck}
                  reactions},
  journaltitle = jomch,
  date         = 2006,
  volume       = 691,
  number       = 13,
  pages        = {3027-3036},
  indextitle   = {Effect of immobilization on catalytic characteristics},
}

@article{angenendt,
  author       = {Angenendt, Arnold},
  title        = {In Honore Salvatoris~-- Vom Sinn und Unsinn der
                  Patrozinienkunde},
  journaltitle = {Revue d'Histoire Eccl{\'e}siastique},
  date         = 2002,
  volume       = 97,
  pages        = {431--456, 791--823},
  langid       = {german},
  indextitle   = {In Honore Salvatoris},
  shorttitle   = {In Honore Salvatoris},
  annotation   = {A German article in a French journal. Apart from that, a
                  typical \texttt{article} entry. Note the \texttt{indextitle}
                  field},
}

@article{baez/article,
  author       = {Baez, John C. and Lauda, Aaron D.},
  title        = {Higher-Dimensional Algebra {V}: 2-Groups},
  journaltitle = {Theory and Applications of Categories},
  date         = 2004,
  volume       = 12,
  pages        = {423-491},
  version      = 3,
  eprint       = {math/0307200v3},
  eprinttype   = {arxiv},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {An \texttt{article} with \texttt{eprint} and
                  \texttt{eprinttype} fields. Note that the arXiv reference is
                  transformed into a clickable link if \texttt{hyperref} support
                  has been enabled.  Compare \texttt{baez\slash online}, which
                  is the same item given as an \texttt{online} entry},
}

@article{bertram,
  author       = {Bertram, Aaron and Wentworth, Richard},
  title        = {Gromov invariants for holomorphic maps on {Riemann} surfaces},
  journaltitle = jams,
  date         = 1996,
  volume       = 9,
  number       = 2,
  pages        = {529-571},
  langid       = {english},
  langidopts   = {variant=american},
  shorttitle   = {Gromov invariants},
  annotation   = {An \texttt{article} entry with a \texttt{volume} and a
                  \texttt{number} field},
}

@article{doody,
  author       = {Doody, Terrence},
  title        = {Hemingway's Style and {Jake's} Narration},
  year         = 1974,
  volume       = 4,
  number       = 3,
  pages        = {212-225},
  langid       = {english},
  langidopts   = {variant=american},
  related      = {matuz:doody},
  relatedstring= {\autocap{e}xcerpt in},
  journal      = {The Journal of Narrative Technique},
  annotation   = {An \texttt{article} entry cited as an excerpt from a
                  \texttt{collection} entry. Note the format of the
                  \texttt{related} and \texttt{relatedstring} fields},
}

@collection{matuz:doody,
  editor       = {Matuz, Roger},
  title        = {Contemporary Literary Criticism},
  year         = 1990,
  volume       = 61,
  publisher    = {Gale},
  location     = {Detroit},
  pages        = {204-208},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {A \texttt{collection} entry providing the excerpt information
                  for the \texttt{doody} entry. Note the format of the
                  \texttt{pages} field},
}

@article{gillies,
  author       = {Gillies, Alexander},
  title        = {Herder and the Preparation of {Goethe's} Idea of World
                  Literature},
  journaltitle = {Publications of the English Goethe Society},
  date         = 1933,
  series       = {newseries},
  volume       = 9,
  pages        = {46-67},
  langid       = {english},
  langidopts   = {variant=british},
  annotation   = {An \texttt{article} entry with a \texttt{series} and a
                  \texttt{volume} field. Note that format of the \texttt{series}
                  field in the database file},
}

@article{glashow,
  author       = {Glashow, Sheldon},
  title        = {Partial Symmetries of Weak Interactions},
  journaltitle = {Nucl.~Phys.},
  date         = 1961,
  volume       = 22,
  pages        = {579-588},
}

@article{herrmann,
  author       = {Herrmann, Wolfgang A. and {\"O}fele, Karl and Schneider,
                  Sabine K.  and Herdtweck, Eberhardt and Hoffmann, Stephan D.},
  title        = {A carbocyclic carbene as an efficient catalyst ligand for {C--C}
                  coupling reactions},
  journaltitle = anch-ie,
  date         = 2006,
  volume       = 45,
  number       = 23,
  pages        = {3859-3862},
  indextitle   = {Carbocyclic carbene as an efficient catalyst, A},
}

@article{kastenholz,
  author       = {Kastenholz, M. A. and H{\"u}nenberger, Philippe H.},
  title        = {Computation of methodology\hyphen independent ionic solvation
                  free energies from molecular simulations},
  journaltitle = jchph,
  date         = 2006,
  subtitle     = {{I}. {The} electrostatic potential in molecular liquids},
  volume       = 124,
  eid          = 124106,
  doi          = {10.1063/1.2172593},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Computation of ionic solvation free energies},
  annotation   = {An \texttt{article} entry with an \texttt{eid} and a
                  \texttt{doi} field. Note that the \textsc{doi} is transformed
                  into a clickable link if \texttt{hyperref} support has been
                  enabled},
  abstract     = {The computation of ionic solvation free energies from
                  atomistic simulations is a surprisingly difficult problem that
                  has found no satisfactory solution for more than 15 years. The
                  reason is that the charging free energies evaluated from such
                  simulations are affected by very large errors. One of these is
                  related to the choice of a specific convention for summing up
                  the contributions of solvent charges to the electrostatic
                  potential in the ionic cavity, namely, on the basis of point
                  charges within entire solvent molecules (M scheme) or on the
                  basis of individual point charges (P scheme). The use of an
                  inappropriate convention may lead to a charge-independent
                  offset in the calculated potential, which depends on the
                  details of the summation scheme, on the quadrupole-moment
                  trace of the solvent molecule, and on the approximate form
                  used to represent electrostatic interactions in the
                  system. However, whether the M or P scheme (if any) represents
                  the appropriate convention is still a matter of on-going
                  debate. The goal of the present article is to settle this
                  long-standing controversy by carefully analyzing (both
                  analytically and numerically) the properties of the
                  electrostatic potential in molecular liquids (and inside
                  cavities within them).},
}

@article{murray,
  author       = {Hostetler, Michael J. and Wingate, Julia E. and Zhong,
                  Chuan-Jian and Harris, Jay E. and Vachet, Richard W. and
                  Clark, Michael R.  and Londono, J. David and Green, Stephen
                  J. and Stokes, Jennifer J.  and Wignall, George D. and Glish,
                  Gary L. and Porter, Marc D.  and Evans, Neal D. and Murray,
                  Royce W.},
  title        = {Alkanethiolate gold cluster molecules with core diameters from
                  1.5 to 5.2~{nm}},
  journaltitle = {Langmuir},
  date         = 1998,
  subtitle     = {Core and monolayer properties as a function of core size},
  volume       = 14,
  number       = 1,
  pages        = {17-30},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Alkanethiolate gold cluster molecules},
  shorttitle   = {Alkanethiolate gold cluster molecules},
  annotation   = {An \texttt{article} entry with \arabic{author} authors. By
                  default, long author and editor lists are automatically
                  truncated. This is configurable},
}

@article{reese,
  author       = {Reese, Trevor R.},
  title        = {Georgia in {Anglo-Spanish} Diplomacy, 1736--1739},
  journaltitle = {William and Mary Quarterly},
  date         = 1958,
  series       = 3,
  volume       = 15,
  pages        = {168-190},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {An \texttt{article} entry with a \texttt{series} and a
                  \texttt{volume} field. Note the format of the series. If the
                  value of the \texttt{series} field is an integer, this number
                  is printed as an ordinal and the string \enquote*{series} is
                  appended automatically},
}

@article{sarfraz,
  author       = {M. Sarfraz and M. F. A. Razzak},
  title        = {Technical section: {An} algorithm for automatic capturing of
                  the font outlines},
  year         = 2002,
  volume       = 26,
  number       = 5,
  pages        = {795-804},
  issn         = {0097-8493},
  journal      = {Computers and Graphics},
  annotation   = {An \texttt{article} entry with an \texttt{issn} field},
}

@article{shore,
  author       = {Shore, Bradd},
  title        = {Twice-Born, Once Conceived},
  journaltitle = {American Anthropologist},
  date         = {1991-03},
  subtitle     = {Meaning Construction and Cultural Cognition},
  series       = {newseries},
  volume       = 93,
  number       = 1,
  pages        = {9-27},
  annotation   = {An \texttt{article} entry with \texttt{series},
                  \texttt{volume}, and \texttt{number} fields. Note the format
                  of the \texttt{series} which is a localization key},
}

@article{sigfridsson,
  author       = {Sigfridsson, Emma and Ryde, Ulf},
  title        = {Comparison of methods for deriving atomic charges from the
                  electrostatic potential and moments},
  journaltitle = {Journal of Computational Chemistry},
  date         = 1998,
  volume       = 19,
  number       = 4,
  pages        = {377-395},
  doi          = {10.1002/(SICI)1096-987X(199803)19:4<377::AID-JCC1>3.0.CO;2-P},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Methods for deriving atomic charges},
  annotation   = {An \texttt{article} entry with \texttt{volume},
                  \texttt{number}, and \texttt{doi} fields. Note that the
                  \textsc{doi} is transformed into a clickable link if
                  \texttt{hyperref} support has been enabled},
  abstract     = {Four methods for deriving partial atomic charges from the
                  quantum chemical electrostatic potential (CHELP, CHELPG,
                  Merz-Kollman, and RESP) have been compared and critically
                  evaluated. It is shown that charges strongly depend on how and
                  where the potential points are selected. Two alternative
                  methods are suggested to avoid the arbitrariness in the
                  point-selection schemes and van der Waals exclusion radii:
                  CHELP-BOW, which also estimates the charges from the
                  electrostatic potential, but with potential points that are
                  Boltzmann-weighted after their occurrence in actual
                  simulations using the energy function of the program in which
                  the charges will be used, and CHELMO, which estimates the
                  charges directly from the electrostatic multipole
                  moments. Different criteria for the quality of the charges are
                  discussed.},
}

@article{spiegelberg,
  author       = {Spiegelberg, Herbert},
  title        = {\mkbibquote{Intention} und \mkbibquote{Intentionalit{\"a}t} in
                  der Scholastik, bei Brentano und Husserl},
  journaltitle = {Studia Philosophica},
  date         = 1969,
  volume       = 29,
  pages        = {189-216},
  langid       = {german},
  sorttitle    = {Intention und Intentionalitat in der Scholastik, bei Brentano
                  und Husserl},
  indexsorttitle= {Intention und Intentionalitat in der Scholastik, bei Brentano
                  und Husserl},
  shorttitle   = {Intention und Intentionalit{\"a}t},
  annotation   = {An \texttt{article} entry. Note the \texttt{sorttitle} and
                  \texttt{indexsorttitle} fields and the markup of the quotes in
                  the database file},
}

@article{springer,
  author       = {Springer, Otto},
  title        = {Mediaeval Pilgrim Routes from {Scandinavia} to {Rome}},
  journaltitle = {Mediaeval Studies},
  date         = 1950,
  volume       = 12,
  pages        = {92-122},
  langid       = {english},
  langidopts   = {variant=british},
  shorttitle   = {Mediaeval Pilgrim Routes},
  annotation   = {A plain \texttt{article} entry},
}

@article{weinberg,
  author       = {Weinberg, Steven},
  title        = {A Model of Leptons},
  journaltitle = {Phys.~Rev.~Lett.},
  date         = 1967,
  volume       = 19,
  pages        = {1264-1266},
}

@article{yoon,
  author       = {Yoon, Myeong S. and Ryu, Dowook and Kim, Jeongryul and Ahn,
                  Kyo Han},
  title        = {Palladium pincer complexes with reduced bond angle strain:
                  efficient catalysts for the {Heck} reaction},
  journaltitle = {Organometallics},
  date         = 2006,
  volume       = 25,
  number       = 10,
  pages        = {2409-2411},
  indextitle   = {Palladium pincer complexes},
}

@book{aristotle:anima,
  author       = {Aristotle},
  title        = {De Anima},
  date         = 1907,
  editor       = {Hicks, Robert Drew},
  publisher    = cup,
  location     = {Cambridge},
  keywords     = {primary},
  langid       = {english},
  langidopts   = {variant=british},
  annotation   = {A \texttt{book} entry with an \texttt{author} and an
                  \texttt{editor}},
}

@book{aristotle:physics,
  author       = {Aristotle},
  title        = {Physics},
  date         = 1929,
  translator   = {Wicksteed, P. H. and Cornford, F. M.},
  publisher    = {G. P. Putnam},
  location     = {New York},
  keywords     = {primary},
  langid       = {english},
  langidopts   = {variant=american},
  shorttitle   = {Physics},
  annotation   = {A \texttt{book} entry with a \texttt{translator} field},
}

@book{aristotle:poetics,
  author       = {Aristotle},
  title        = {Poetics},
  date         = 1968,
  editor       = {Lucas, D. W.},
  series       = {Clarendon {Aristotle}},
  publisher    = {Clarendon Press},
  location     = {Oxford},
  keywords     = {primary},
  langid       = {english},
  langidopts   = {variant=british},
  shorttitle   = {Poetics},
  annotation   = {A \texttt{book} entry with an \texttt{author} and an
                  \texttt{editor} as well as a \texttt{series} field},
}

@mvbook{aristotle:rhetoric,
  author       = {Aristotle},
  title        = {The Rhetoric of {Aristotle} with a commentary by the late {Edward
                  Meredith Cope}},
  date         = 1877,
  editor       = {Cope, Edward Meredith},
  commentator  = {Cope, Edward Meredith},
  volumes      = 3,
  publisher    = cup,
  keywords     = {primary},
  langid       = {english},
  langidopts   = {variant=british},
  sorttitle    = {Rhetoric of Aristotle},
  indextitle   = {Rhetoric of {Aristotle}, The},
  shorttitle   = {Rhetoric},
  annotation   = {A commented edition. Note the concatenation of the
                  \texttt{editor} and \texttt{commentator} fields as well as the
                  \texttt{volumes}, \texttt{sorttitle}, and \texttt{indextitle}
                  fields},
}

@book{augustine,
  author       = {Augustine, Robert L.},
  title        = {Heterogeneous catalysis for the synthetic chemist},
  date         = 1995,
  publisher    = {Marcel Dekker},
  location     = {New York},
  langid       = {english},
  langidopts   = {variant=american},
  shorttitle   = {Heterogeneous catalysis},
  annotation   = {A plain \texttt{book} entry},
}

@book{averroes/bland,
  author       = {Averroes},
  title        = {The Epistle on the Possibility of Conjunction with the Active
                  Intellect by {Ibn Rushd} with the Commentary of {Moses Narboni}},
  date         = 1982,
  editor       = {Bland, Kalman P.},
  translator   = {Bland, Kalman P.},
  series       = {Moreshet: Studies in {Jewish} History, Literature and Thought},
  number       = 7,
  publisher    = {Jewish Theological Seminary of America},
  location     = {New York},
  keywords     = {primary},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Epistle on the Possibility of Conjunction, The},
  shorttitle   = {Possibility of Conjunction},
  annotation   = {A \texttt{book} entry with a \texttt{series} and a
                  \texttt{number}. Note the concatenation of the \texttt{editor}
                  and \texttt{translator} fields as well as the
                  \texttt{indextitle} field},
}

@book{averroes/hannes,
  author       = {Averroes},
  title        = {Des Averro{\"e}s Abhandlung: \mkbibquote{{\"U}ber die
                  M{\"o}glichkeit der Conjunktion} oder \mkbibquote{{\"U}ber den
                  materiellen Intellekt}},
  date         = 1892,
  editor       = {Hannes, Ludwig},
  translator   = {Hannes, Ludwig},
  annotator    = {Hannes, Ludwig},
  publisher    = {C.~A. Kaemmerer},
  location     = {Halle an der Saale},
  keywords     = {primary},
  langid       = {german},
  sorttitle    = {Uber die Moglichkeit der Conjunktion},
  indexsorttitle= {Uber die Moglichkeit der Conjunktion},
  indextitle   = {{\"U}ber die M{\"o}glichkeit der Conjunktion},
  shorttitle   = {{\"U}ber die M{\"o}glichkeit der Conjunktion},
  annotation   = {An annotated edition. Note the concatenation of the
                  \texttt{editor}, \texttt{translator}, and \texttt{annotator}
                  fields. Also note the \texttt{shorttitle},
                  \texttt{indextitle}, \texttt{sorttitle}, and
                  \texttt{indexsorttitle} fields},
}

@book{averroes/hercz,
  author       = {Averroes},
  title        = {Drei Abhandlungen {\"u}ber die Conjunction des separaten
                  Intellects mit dem Menschen},
  date         = 1869,
  editor       = {Hercz, J.},
  translator   = {Hercz, J.},
  publisher    = {S.~Hermann},
  location     = {Berlin},
  keywords     = {primary},
  langid       = {german},
  indexsorttitle= {Drei Abhandlungen uber die Conjunction},
  indextitle   = {Drei Abhandlungen {\"u}ber die Conjunction},
  subtitle     = {Von Averroes (Vater und Sohn), aus dem Arabischen
                  {\"u}bersetzt von Samuel Ibn Tibbon},
  shorttitle   = {Drei Abhandlungen},
  annotation   = {A \texttt{book} entry. Note the concatenation of the
                  \texttt{editor} and \texttt{translator} fields as well as the
                  \texttt{indextitle} and \texttt{indexsorttitle} fields},
}

@book{cicero,
  author       = {Cicero, Marcus Tullius},
  title        = {De natura deorum. {\"U}ber das Wesen der G{\"o}tter},
  date         = 1995,
  editor       = {Blank-Sangmeister, Ursula},
  translator   = {Blank-Sangmeister, Ursula},
  afterword    = {Thraede, Klaus},
  language     = {langlatin and langgerman},
  publisher    = {Reclam},
  location     = {Stuttgart},
  langid       = {german},
  indextitle   = {De natura deorum},
  shorttitle   = {De natura deorum},
  annotation   = {A bilingual edition of Cicero's \emph{De natura deorum}, with
                  a German translation. Note the format of the \texttt{language}
                  field in the database file, the concatenation of the
                  \texttt{editor} and \texttt{translator} fields, and the
                  \texttt{afterword} field},
}

@book{coleridge,
  author       = {Coleridge, Samuel Taylor},
  title        = {Biographia literaria, or {Biographical} sketches of my literary
                  life and opinions},
  date         = 1983,
  editor       = {Coburn, Kathleen and Engell, James and Bate, W. Jackson},
  maintitle    = {The collected works of {Samuel Taylor Coleridge}},
  volume       = 7,
  part         = 2,
  series       = {Bollingen Series},
  number       = 75,
  publisher    = {Routledge {and} Kegan Paul},
  location     = {London},
  langid       = {english},
  langidopts   = {variant=british},
  indextitle   = {Biographia literaria},
  shorttitle   = {Biographia literaria},
  annotation   = {One (partial) volume of a multivolume book. This is a
                  \texttt{book} entry with a \texttt{volume} and a \texttt{part}
                  field which explicitly refers to the second (physical) part of
                  the seventh (logical) volume. Also note the \texttt{series}
                  and \texttt{number} fields},
}

@book{companion,
  author       = {Goossens, Michel and Mittelbach, Frank and Samarin, Alexander},
  title        = {The {LaTeX} Companion},
  date         = 1994,
  edition      = 1,
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  pagetotal    = 528,
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {LaTeX Companion},
  indextitle   = {LaTeX Companion, The},
  shorttitle   = {LaTeX Companion},
  annotation   = {A book with three authors. Note the formatting of the author
                  list. By default, only the first name is reversed in the
                  bibliography},
}

@book{cotton,
  author       = {Cotton, Frank Albert and Wilkinson, Geoffrey and Murillio,
                  Carlos A. and Bochmann, Manfred},
  title        = {Advanced inorganic chemistry},
  date         = 1999,
  edition      = 6,
  publisher    = {Wiley},
  location     = {Chichester},
  langid       = {english},
  langidopts   = {variant=british},
  annotation   = {A \texttt{book} entry with \arabic{author} authors and an
                  \texttt{edition} field. By default, long \texttt{author} and
                  \texttt{editor} lists are automatically truncated. This is
                  configurable},
}

@book{gerhardt,
  author       = {Gerhardt, Michael J.},
  title        = {The Federal Appointments Process},
  date         = 2000,
  publisher    = {Duke University Press},
  location     = {Durham and London},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Federal Appointments Process},
  indextitle   = {Federal Appointments Process, The},
  subtitle     = {A Constitutional and Historical Analysis},
  shorttitle   = {Federal Appointments Process},
  annotation   = {This is a \texttt{book} entry. Note the format of the
                  \texttt{location} field as well as the \texttt{sorttitle} and
                  \texttt{indextitle} fields},
}

@book{gonzalez,
  author       = {Gonzalez, Ray},
  title        = {The Ghost of {John Wayne} and Other Stories},
  date         = 2001,
  publisher    = {The University of Arizona Press},
  location     = {Tucson},
  isbn         = {0-816-52066-6},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Ghost of John Wayne and Other Stories},
  indextitle   = {Ghost of {John Wayne} and Other Stories, The},
  shorttitle   = {Ghost of {John Wayne}},
  annotation   = {A collection of short stories. This is a \texttt{book} entry.
                  Note the \texttt{sorttitle} and \texttt{indextitle} fields in
                  the database file. There's also an \texttt{isbn} field},
}

@book{hammond,
  author       = {Hammond, Christopher},
  title        = {The basics of crystallography and diffraction},
  date         = 1997,
  publisher    = {International Union of Crystallography and Oxford University
                  Press},
  location     = {Oxford},
  langid       = {english},
  langidopts   = {variant=british},
  sorttitle    = {Basics of crystallography and diffraction},
  indextitle   = {Basics of crystallography and diffraction, The},
  shorttitle   = {Crystallography and diffraction},
  annotation   = {A \texttt{book} entry. Note the \texttt{sorttitle} and
                  \texttt{indextitle} fields as well as the format of the
                  \texttt{publisher} field},
}

@book{iliad,
  author       = {Homer},
  title        = {Die Ilias},
  date         = 2004,
  translator   = {Schadewaldt, Wolfgang},
  introduction = {Latacz, Joachim},
  edition      = 3,
  publisher    = {Artemis \& Winkler},
  location     = {D{\"u}sseldorf and Z{\"u}rich},
  langid       = {german},
  sorttitle    = {Ilias},
  indextitle   = {Ilias, Die},
  shorttitle   = {Ilias},
  annotation   = {A German translation of the \emph{Iliad}. Note the
                  \texttt{translator} and \texttt{introduction} fields and the
                  format of the \texttt{location} field in the database
                  file. Also note the \texttt{sorttitle} and \texttt{indextitle}
                  fields},
}

@mvbook{knuth:ct,
  author       = {Knuth, Donald E.},
  title        = {Computers \& Typesetting},
  date         = {1984/1986},
  volumes      = 5,
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting},
  indexsorttitle= {Computers & Typesetting},
  annotation   = {A five-volume book cited as a whole. This is a \texttt{mvbook}
                  entry, note the \texttt{volumes} field},
}

@book{knuth:ct:a,
  author       = {Knuth, Donald E.},
  title        = {The {\TeX book}},
  date         = 1984,
  maintitle    = {Computers \& Typesetting},
  volume       = {A},
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting A},
  indexsorttitle= {The TeXbook},
  indextitle   = {\protect\TeX book, The},
  shorttitle   = {\TeX book},
  annotation   = {The first volume of a five-volume book. Note the
                  \texttt{sorttitle} field. We want this
                  volume to be listed after the entry referring to the entire
                  five-volume set. Also note the \texttt{indextitle} and
                  \texttt{indexsorttitle} fields. Indexing packages that don't
                  generate robust index entries require some control sequences
                  to be protected from expansion},
}

@book{knuth:ct:b,
  author       = {Knuth, Donald E.},
  title        = {{\TeX}: The Program},
  date         = 1986,
  maintitle    = {Computers \& Typesetting},
  volume       = {B},
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting B},
  indexsorttitle= {TeX: The Program},
  shorttitle   = {\TeX},
  annotation   = {The second volume of a five-volume book. Note the
                  \texttt{sorttitle} field. Also note the
                  \texttt{indexsorttitle} field},
}

@book{knuth:ct:c,
  author       = {Knuth, Donald E.},
  title        = {The {METAFONTbook}},
  date         = 1986,
  maintitle    = {Computers \& Typesetting},
  volume       = {C},
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting C},
  indextitle   = {METAFONTbook, The},
  shorttitle   = {METAFONTbook},
  annotation   = {The third volume of a five-volume book. Note the
                  \texttt{sorttitle} field as well as the
                  \texttt{indextitle} field},
}

@book{knuth:ct:d,
  author       = {Knuth, Donald E.},
  title        = {{METAFONT}: The Program},
  date         = 1986,
  maintitle    = {Computers \& Typesetting},
  volume       = {D},
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting D},
  shorttitle   = {METAFONT},
  annotation   = {The fourth volume of a five-volume book. Note the
                  \texttt{sorttitle} field},
}

@book{knuth:ct:e,
  author       = {Knuth, Donald E.},
  title        = {{Computer Modern} Typefaces},
  date         = 1986,
  maintitle    = {Computers \& Typesetting},
  volume       = {E},
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting E},
  annotation   = {The fifth volume of a five-volume book. Note the
                  \texttt{sorttitle} field},
}

@mvbook{knuth:ct:related,
  author       = {Knuth, Donald E.},
  title        = {Computers \& Typesetting},
  date         = {1984/1986},
  volumes      = 5,
  publisher    = {Addison-Wesley},
  location     = {Reading, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Computers & Typesetting},
  indexsorttitle= {Computers & Typesetting},
  related      = {knuth:ct:a,knuth:ct:b,knuth:ct:c,knuth:ct:d,knuth:ct:e},
  relatedtype  = {multivolume},
  annotation   = {A five-volume book cited as a whole and related to its
                  individual volumes. Note the \texttt{related} and
                  \texttt{relatedtype} fields},
}

@book{kullback,
  author       = {Kullback, Solomon},
  title        = {Information Theory and Statistics},
  year         = 1959,
  publisher    = {John Wiley \& Sons},
  location     = {New York},
  langid       = {english},
  langidopts   = {variant=american},
}

@book{kullback:reprint,
  author       = {Kullback, Solomon},
  title        = {Information Theory and Statistics},
  year         = 1997,
  publisher    = {Dover Publications},
  location     = {New York},
  origyear     = 1959,
  origpublisher= {John Wiley \& Sons},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {A reprint of the \texttt{kullback} entry. Note the format of
                  \texttt{origyear} and \texttt{origpublisher}. These fields are
                  not used by the standard bibliography styles},
}

@book{kullback:related,
  author       = {Kullback, Solomon},
  title        = {Information Theory and Statistics},
  year         = 1997,
  publisher    = {Dover Publications},
  location     = {New York},
  langid       = {english},
  langidopts   = {variant=american},
  related      = {kullback},
  relatedtype  = {origpubin},
  annotation   = {A reprint of the \texttt{kullback} entry. Note the format of
                  the \texttt{related} and \texttt{relatedtype} fields},
}

@book{malinowski,
  author       = {Malinowski, Bronis{\l}aw},
  title        = {Argonauts of the {Western Pacific}},
  date         = 1972,
  edition      = 8,
  publisher    = {Routledge {and} Kegan Paul},
  location     = {London},
  langid       = {english},
  langidopts   = {variant=british},
  subtitle     = {An account of native enterprise and adventure in the
                  Archipelagoes of {Melanesian New Guinea}},
  shorttitle   = {Argonauts},
  annotation   = {This is a \texttt{book} entry. Note the format of the
                  \texttt{publisher} and \texttt{edition} fields as well as the
                  \texttt{subtitle} field},
}

@book{maron,
  author       = {Maron, Monika},
  title        = {Animal Triste},
  date         = 2000,
  translator   = {Brigitte Goldstein},
  origlanguage = {german},
  publisher    = {University of Nebraska Press},
  location     = {Lincoln},
  langid       = {english},
  langidopts   = {variant=american},
  shorttitle   = {Animal Triste},
  annotation   = {An English translation of a German novel with a French title.
                  In other words: a \texttt{book} entry with a
                  \texttt{translator} field.  Note the \texttt{origlanguage}
                  field which is concatenated with the \texttt{translator}},
}

@book{massa,
  author       = {Werner Massa},
  title        = {Crystal structure determination},
  date         = 2004,
  edition      = 2,
  publisher    = {Spinger},
  location     = {Berlin},
  langid       = {english},
  langidopts   = {variant=british},
  annotation   = {A \texttt{book} entry with an \texttt{edition} field},
}

@article{moore,
  author       = {Moore, Gordon E.},
  title        = {Cramming more components onto integrated circuits},
  journaltitle = {Electronics},
  year         = 1965,
  volume       = 38,
  number       = 8,
  pages        = {114-117},
  langid       = {english},
  langidopts   = {variant=american},
}

@article{moore:related,
  author       = {Moore, Gordon E.},
  title        = {Cramming more components onto integrated circuits},
  journaltitle = {Proceedings of the {IEEE}},
  year         = 1998,
  volume       = 86,
  number       = 1,
  pages        = {82-85},
  langid       = {english},
  langidopts   = {variant=american},
  related      = {moore},
  relatedtype  = {reprintfrom},
  annotation   = {A reprint of Moore's law. Note the \texttt{related} and
                  \texttt{relatedtype} fields},
}

@mvbook{nietzsche:ksa,
  author       = {Nietzsche, Friedrich},
  title        = {S{\"a}mtliche Werke},
  date         = 1988,
  editor       = {Colli, Giorgio and Montinari, Mazzino},
  edition      = 2,
  volumes      = 15,
  publisher    = dtv # { and Walter de Gruyter},
  location     = {M{\"u}nchen and Berlin and New York},
  langid       = {german},
  sorttitle    = {Werke-00-000},
  indexsorttitle= {Samtliche Werke},
  subtitle     = {Kritische Studienausgabe},
  annotation   = {The critical edition of Nietzsche's works. This is a
                  \texttt{mvbook} entry referring to a 15-volume work as a
                  whole. Note the \texttt{volumes} field and the format of the
                  \texttt{publisher} and \texttt{location} fields in the
                  database file. Also note the \texttt{sorttitle} and
                  field which is used to fine-tune the
                  sorting order of the bibliography. We want this item listed
                  first in the bibliography},
}

@book{nietzsche:ksa1,
  author       = {Nietzsche, Friedrich},
  title        = {Die Geburt der Trag{\"o}die. Unzeitgem{\"a}{\ss}e
                  Betrachtungen I--IV. Nachgelassene Schriften 1870--1973},
  date         = 1988,
  editor       = {Colli, Giorgio and Montinari, Mazzino},
  maintitle    = {S{\"a}mtliche Werke},
  mainsubtitle = {Kritische Studienausgabe},
  volume       = 1,
  edition      = 2,
  publisher    = dtv # { and Walter de Gruyter},
  location     = {M{\"u}nchen and Berlin and New York},
  langid       = {german},
  sorttitle    = {Werke-01-000},
  indexsorttitle= {Samtliche Werke I},
  bookauthor   = {Nietzsche, Friedrich},
  indextitle   = {S{\"a}mtliche Werke I},
  shorttitle   = {S{\"a}mtliche Werke I},
  annotation   = {A single volume from the critical edition of Nietzsche's
                  works. This \texttt{book} entry explicitly refers to the first
                  volume only. Note the \texttt{title} and \texttt{maintitle}
                  fields. Also note the \texttt{sorttitle}
                  field. We want this entry to be listed after the entry
                  referring to the entire edition},
}

@book{nussbaum,
  author       = {Nussbaum, Martha},
  title        = {Aristotle's \mkbibquote{De Motu Animalium}},
  date         = 1978,
  publisher    = pup,
  location     = {Princeton},
  keywords     = {secondary},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Aristotle's De Motu Animalium},
  indexsorttitle= {Aristotle's De Motu Animalium},
  annotation   = {A \texttt{book} entry. Note the \texttt{sorttitle} and
                  \texttt{indexsorttitle} fields and the markup of the quotes in
                  the database file},
}

@book{piccato,
  author       = {Piccato, Pablo},
  title        = {City of Suspects},
  date         = 2001,
  publisher    = {Duke University Press},
  location     = {Durham and London},
  langid       = {english},
  langidopts   = {variant=american},
  subtitle     = {Crime in {Mexico City}, 1900--1931},
  shorttitle   = {City of Suspects},
  annotation   = {This is a \texttt{book} entry. Note the format of the
                  \texttt{location} field in the database file},
}

@book{vangennep,
  author       = {van Gennep, Arnold},
  title        = {Les rites de passage},
  date         = 1909,
  publisher    = {Nourry},
  location     = {Paris},
  options      = {useprefix},
  langid       = {french},
  sorttitle    = {Rites de passage},
  indextitle   = {Rites de passage, Les},
  shorttitle   = {Rites de passage},
  annotation   = {A \texttt{book} entry. Note the format of the printed name and
                  compare the \texttt{useprefix} option in the \texttt{options}
                  field as well as \texttt{brandt} and \texttt{geer}},
}

@book{vangennep:trans,
  author       = {van Gennep, Arnold},
  title        = {The Rites of Passage},
  year         = 1960,
  translator   = {Vizedom, Monika B. and Caffee, Gabrielle L.},
  language     = {english},
  origlanguage = {french},
  publisher    = {University of Chicago Press},
  options      = {useprefix},
  indextitle   = {Rites of Passage, The},
  sorttitle    = {Rites of Passage},
  shorttitle   = {Rites of Passage},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {A translation of the \texttt{vangennep} entry. Note the
                  \texttt{translator} and \texttt{origlanguage} fields. Compare
                  with the \texttt{vangennep:related} entry.},
}

@book{vangennep:related,
  author       = {van Gennep, Arnold},
  title        = {Les rites de passage},
  date         = 1909,
  publisher    = {Nourry},
  location     = {Paris},
  options      = {useprefix},
  langid       = {french},
  related      = {vizedom:related},
  relatedtype  = {bytranslator},
  sorttitle    = {Rites de passage},
  indextitle   = {Rites de passage, Les},
  shorttitle   = {Rites de passage},
  annotation   = {A variant of the \texttt{vangennep} entry related to its
                  translation. Note the format of the \texttt{related} and
                  \texttt{relatedtype} fields},
}

@book{vizedom:related,
  title        = {The Rites of Passage},
  year         = 1960,
  translator   = {Vizedom, Monika B. and Caffee, Gabrielle L.},
  language     = {english},
  publisher    = {University of Chicago Press},
  langid       = {english},
  langidopts   = {variant=american},
  options      = {usetranslator},
  related      = {vangennep},
  relatedtype  = {translationof},
  indextitle   = {Rites of Passage, The},
  sorttitle    = {Rites of Passage},
  shorttitle   = {Rites of Passage},
  annotation   = {A translated work from \texttt{vangennep}. Note the format of
                  the \texttt{related} and \texttt{relatedtype} fields},
}

@mvbook{vazques-de-parga,
  author       = {V{\'a}zques{ de }Parga, Luis and Lacarra, Jos{\'e} Mar{\'i}a
                  and Ur{\'i}a R{\'i}u, Juan},
  title        = {Las Peregrinaciones a Santiago de Compostela},
  date         = 1993,
  volumes      = 3,
  note         = {Ed. facs. de la realizada en 1948--49},
  publisher    = {Iberdrola},
  location     = {Pamplona},
  langid       = {spanish},
  sorttitle    = {Peregrinaciones a Santiago de Compostela},
  indextitle   = {Peregrinaciones a Santiago de Compostela, Las},
  shorttitle   = {Peregrinaciones},
  annotation   = {A multivolume book cited as a whole. This is a \texttt{mvbook}
                  entry with \texttt{volumes}, \texttt{note},
                  \texttt{sorttitle}, and \texttt{indextitle} fields},
}

@book{wilde,
  author       = {Wilde, Oscar},
  title        = {The Importance of Being Earnest: A Trivial Comedy for Serious
                  People},
  year         = 1899,
  series       = {English and {American} drama of the Nineteenth Century},
  publisher    = {Leonard Smithers {and} Company},
  eprint       = {4HIWAAAAYAAJ},
  eprinttype   = {googlebooks},
  annotation   = {A \texttt{book} with \texttt{eprint} and \texttt{eprinttype}
                  fields.},
}

@book{worman,
  author       = {Worman, Nancy},
  title        = {The Cast of Character},
  date         = 2002,
  publisher    = {University of Texas Press},
  location     = {Austin},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Cast of Character},
  indextitle   = {Cast of Character, The},
  subtitle     = {Style in {Greek} Literature},
  shorttitle   = {Cast of Character},
  annotation   = {A \texttt{book} entry. Note the \texttt{sorttitle} and
                  \texttt{indextitle} fields},
}

@mvcollection{britannica,
  editor       = {Preece, Warren E.},
  title        = {The {New Encyclop{\ae}dia Britannica}},
  date         = 2003,
  edition      = 15,
  volumes      = 32,
  publisher    = {Encyclop{\ae}dia Britannica},
  location     = {Chicago, Ill.},
  options      = {useeditor=false},
  label        = {EB},
  langid       = {english},
  langidopts   = {variant=british},
  sorttitle    = {Encyclop{\ae}dia Britannica},
  indextitle   = {{Encyclop{\ae}dia Britannica}, The {New}},
  shorttitle   = {{Encyclop{\ae}dia Britannica}},
  annotation   = {This is a \texttt{mvcollection} entry for an encyclopedia. Note
                  the \texttt{useeditor} option in the \texttt{options} field as
                  well as the \texttt{sorttitle} field. We want this entry to be
                  cited and alphabetized by title even though there is an
                  editor. In addition to that, we want the title to be
                  alphabetized under \enquote*{E} rather than \enquote*{T}. Also
                  note the \texttt{label} field which is provided for
                  author-year citation styles},
}

@collection{gaonkar,
  editor       = {Gaonkar, Dilip Parameshwar},
  title        = {Alternative Modernities},
  date         = 2001,
  publisher    = {Duke University Press},
  location     = {Durham and London},
  isbn         = {0-822-32714-7},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {This is a \texttt{collection} entry. Note the format of the
                  \texttt{location} field in the database file as well as the
                  \texttt{isbn} field},
}

@incollection{gaonkar:in,
  author       = {Gaonkar, Dilip Parameshwar},
  editor       = {Gaonkar, Dilip Parameshwar},
  title        = {On Alternative Modernities},
  date         = 2001,
  booktitle    = {Alternative Modernities},
  publisher    = {Duke University Press},
  location     = {Durham and London},
  isbn         = {0-822-32714-7},
  pages        = {1-23},
}

@mvcollection{jaffe,
  editor       = {Jaff{\'e}, Philipp},
  title        = {Regesta Pontificum Romanorum ab condita ecclesia ad annum post
                  Christum natum \textsc{mcxcviii}},
  date         = {1885/1888},
  editora      = {Loewenfeld, Samuel and Kaltenbrunner, Ferdinand and Ewald,
                  Paul},
  edition      = 2,
  volumes      = 2,
  location     = {Leipzig},
  langid       = {latin},
  editoratype  = {redactor},
  indextitle   = {Regesta Pontificum Romanorum},
  shorttitle   = {Regesta Pontificum Romanorum},
  annotation   = {A \texttt{mvcollection} entry with \texttt{edition} and
                  \texttt{volumes} fields. Note the \texttt{editora} and
                  \texttt{editoratype} fields},
}

% booktitle and booksubtitle are only needed for BibTeX's less sophisticated
% inheritance set-up to make sure westfahl:space shows correctly.
% With Biber they are not needed.
@collection{westfahl:frontier,
  editor       = {Westfahl, Gary},
  title        = {Space and Beyond},
  date         = 2000,
  subtitle     = {The Frontier Theme in Science Fiction},
  publisher    = {Greenwood},
  location     = {Westport, Conn. and London},
  langid       = {english},
  langidopts   = {variant=american},
  booktitle    = {Space and Beyond},
  booksubtitle = {The Frontier Theme in Science Fiction},
  annotation   = {This is a \texttt{collection} entry. Note the format of the
                  \texttt{location} field as well as the \texttt{subtitle}
                  field},
}

@inbook{kant:kpv,
  title        = {Kritik der praktischen Vernunft},
  date         = 1968,
  author       = {Kant, Immanuel},
  booktitle    = {Kritik der praktischen Vernunft. Kritik der Urtheilskraft},
  bookauthor   = {Kant, Immanuel},
  maintitle    = {Kants Werke. Akademie Textausgabe},
  volume       = 5,
  publisher    = {Walter de Gruyter},
  location     = {Berlin},
  pages        = {1-163},
  shorthand    = {KpV},
  langid       = {german},
  shorttitle   = {Kritik der praktischen Vernunft},
  annotation   = {An edition of Kant's \emph{Collected Works}, volume five. This
                  is an \texttt{inbook} entry which explicitly refers to the
                  \emph{Critique of Practical Reason} only, not to the entire
                  fifth volume. Note the \texttt{author} and \texttt{bookauthor}
                  fields in the database file. By default, the
                  \texttt{bookauthor} is omitted if the values of the
                  \texttt{author} and \texttt{bookauthor} fields are identical},
}

@inbook{kant:ku,
  title        = {Kritik der Urtheilskraft},
  date         = 1968,
  author       = {Kant, Immanuel},
  booktitle    = {Kritik der praktischen Vernunft. Kritik der Urtheilskraft},
  bookauthor   = {Kant, Immanuel},
  maintitle    = {Kants Werke. Akademie Textausgabe},
  volume       = 5,
  publisher    = {Walter de Gruyter},
  location     = {Berlin},
  pages        = {165-485},
  shorthand    = {KU},
  langid       = {german},
  annotation   = {An edition of Kant's \emph{Collected Works}, volume five. This
                  is an \texttt{inbook} entry which explicitly refers to the
                  \emph{Critique of Judgment} only, not to the entire fifth
                  volume},
}

@inbook{nietzsche:historie,
  title        = {Unzeitgem{\"a}sse Betrachtungen. Zweites St{\"u}ck},
  date         = 1988,
  author       = {Nietzsche, Friedrich},
  booktitle    = {Die Geburt der Trag{\"o}die. Unzeitgem{\"a}{\ss}e
                  Betrachtungen I--IV. Nachgelassene Schriften 1870--1973},
  bookauthor   = {Nietzsche, Friedrich},
  editor       = {Colli, Giorgio and Montinari, Mazzino},
  subtitle     = {Vom Nutzen und Nachtheil der Historie f{\"u}r das Leben},
  maintitle    = {S{\"a}mtliche Werke},
  mainsubtitle = {Kritische Studienausgabe},
  volume       = 1,
  publisher    = dtv # { and Walter de Gruyter},
  location     = {M{\"u}nchen and Berlin and New York},
  pages        = {243-334},
  langid       = {german},
  sorttitle    = {Werke-01-243},
  indexsorttitle= {Vom Nutzen und Nachtheil der Historie fur das Leben},
  indextitle   = {Vom Nutzen und Nachtheil der Historie f{\"u}r das Leben},
  shorttitle   = {Vom Nutzen und Nachtheil der Historie},
  annotation   = {A single essay from the critical edition of Nietzsche's works.
                  This \texttt{inbook} entry explicitly refers to an essay found
                  in the first volume. Note the \texttt{title},
                  \texttt{booktitle}, and \texttt{maintitle} fields. Also note
                  the \texttt{sorttitle} field. We want
                  this entry to be listed after the entry referring to the
                  entire first volume},
}

@incollection{brandt,
  author       = {von Brandt, Ahasver and Erich Hoffmann},
  editor       = {Ferdinand Seibt},
  title        = {Die nordischen L{\"a}nder von der Mitte des 11.~Jahrhunderts
                  bis 1448},
  date         = 1987,
  booktitle    = {Europa im Hoch- und Sp{\"a}tmittelalter},
  series       = {Handbuch der europ{\"a}ischen Geschichte},
  number       = 2,
  publisher    = {Klett-Cotta},
  location     = {Stuttgart},
  pages        = {884-917},
  options      = {useprefix=false},
  langid       = {german},
  indexsorttitle= {Nordischen Lander von der Mitte des 11. Jahrhunderts bis
                  1448},
  indextitle   = {Nordischen L{\"a}nder von der Mitte des 11.~Jahrhunderts bis
                  1448, Die},
  shorttitle   = {Die nordischen L{\"a}nder},
  annotation   = {An \texttt{incollection} entry with a \texttt{series} and a
                  \texttt{number}. Note the format of the printed name and
                  compare the \texttt{useprefix} option in the \texttt{options}
                  field as well as \texttt{vangennep}. Also note the
                  \texttt{indextitle, and \texttt{indexsorttitle} fields}},
}

@incollection{hyman,
  author       = {Arthur Hyman},
  editor       = {O'Meara, Dominic J.},
  title        = {Aristotle's Theory of the Intellect and its Interpretation by
                  {Averroes}},
  date         = 1981,
  booktitle    = {Studies in {Aristotle}},
  series       = {Studies in Philosophy and the History of Philosophy},
  number       = 9,
  publisher    = {The Catholic University of America Press},
  location     = {Washington, D.C.},
  pages        = {161-191},
  keywords     = {secondary},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Aristotle's Theory of the Intellect},
  shorttitle   = {Aristotle's Theory of the Intellect},
  annotation   = {An \texttt{incollection} entry with a \texttt{series} and
                  \texttt{number} field},
}

@incollection{pines,
  author       = {Pines, Shlomo},
  editor       = {Twersky, Isadore},
  title        = {The Limitations of Human Knowledge According to {Al-Farabi}, {ibn
                  Bajja}, and {Maimonides}},
  date         = 1979,
  booktitle    = {Studies in Medieval {Jewish} History and Literature},
  publisher    = hup,
  location     = {Cambridge, Mass.},
  pages        = {82-109},
  keywords     = {secondary},
  langid       = {english},
  langidopts   = {variant=american},
  indextitle   = {Limitations of Human Knowledge According to {Al-Farabi}, {ibn
                  Bajja}, and {Maimonides}, The},
  shorttitle   = {Limitations of Human Knowledge},
  annotation   = {A typical \texttt{incollection} entry. Note the
                  \texttt{indextitle} field},
}

@inproceedings{moraux,
  author       = {Moraux, Paul},
  editor       = {Lloyd, G. E. R. and Owen, G. E. L.},
  title        = {Le \emph{De Anima} dans la tradition gr{\`e}cque},
  date         = 1979,
  booktitle    = {Aristotle on Mind and the Senses},
  subtitle     = {Quelques aspects de l'interpretation du trait{\'e}, de
                  Theophraste {\`a} Themistius},
  booktitleaddon= {Proceedings of the Seventh Symposium Aristotelicum},
  eventdate    = 1975,
  publisher    = cup,
  location     = {Cambridge},
  pages        = {281-324},
  keywords     = {secondary},
  langid       = {french},
  indexsorttitle= {De Anima dans la tradition grecque},
  indextitle   = {\emph{De Anima} dans la tradition gr{\`e}cque, Le},
  shorttitle   = {\emph{De Anima} dans la tradition gr{\`e}cque},
  annotation   = {This is a typical \texttt{inproceedings} entry. Note the
                  \texttt{booksubtitle}, \texttt{shorttitle},
                  \texttt{indextitle}, and \texttt{indexsorttitle} fields. Also
                  note the \texttt{eventdate} field.},
}

@inproceedings{salam,
  author       = {Salam, Abdus},
  editor       = {Svartholm, Nils},
  title        = {Weak and Electromagnetic Interactions},
  date         = 1968,
  booktitle    = {Elementary particle theory},
  booksubtitle = {Relativistic groups and analyticity},
  booktitleaddon= {Proceedings of the {Eighth Nobel Symposium}},
  eventdate    = {1968-05-19/1968-05-25},
  venue        = {Aspen{\"a}sgarden, Lerum},
  publisher    = {Almquist \& Wiksell},
  location     = {Stockholm},
  pages        = {367-377},
}

@manual{cms,
  title        = {The {Chicago} Manual of Style},
  date         = 2003,
  subtitle     = {The Essential Guide for Writers, Editors, and Publishers},
  edition      = 15,
  publisher    = {University of Chicago Press},
  location     = {Chicago, Ill.},
  isbn         = {0-226-10403-6},
  label        = {CMS},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Chicago Manual of Style},
  indextitle   = {Chicago Manual of Style, The},
  shorttitle   = {Chicago Manual of Style},
  annotation   = {This is a \texttt{manual} entry without an \texttt{author} or
                  \texttt{editor}. Note the \texttt{label} field in the database
                  file which is provided for author-year citation styles. Also
                  note the \texttt{sorttitle} and \texttt{indextitle} fields. By
                  default, all entries without an \texttt{author} or
                  \texttt{editor} are alphabetized by \texttt{title} but we want
                  this entry to be alphabetized under \enquote*{C} rather than
                  \enquote*{T}. There's also an \texttt{isbn} field},
}

@online{baez/online,
  author       = {Baez, John C. and Lauda, Aaron D.},
  title        = {Higher-Dimensional Algebra {V}: 2-Groups},
  date         = {2004-10-27},
  version      = 3,
  langid       = {english},
  langidopts   = {variant=american},
  eprinttype   = {arxiv},
  eprint       = {math/0307200v3},
  annotation   = {An \texttt{online} reference from arXiv. Note the
                  \texttt{eprint} and \texttt{eprinttype} fields. Compare
                  \texttt{baez\slash article} which is the same item given as an
                  \texttt{article} entry with eprint information},
}

@online{ctan,
  title        = {CTAN},
  date         = 2006,
  url          = {http://www.ctan.org},
  subtitle     = {The {Comprehensive TeX Archive Network}},
  urldate      = {2006-10-01},
  label        = {CTAN},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {This is an \texttt{online} entry. The \textsc{url}, which is
                  given in the \texttt{url} field, is transformed into a
                  clickable link if \texttt{hyperref} support has been
                  enabled. Note the format of the \texttt{urldate} field
                  (\texttt{yyyy-mm-dd}) in the database file. Also note the
                  \texttt{label} field which may be used as a fallback by
                  citation styles which need an \texttt{author} and\slash or a
                  \texttt{year}},
}

@online{itzhaki,
  author       = {Itzhaki, Nissan},
  title        = {Some remarks on {'t Hooft's} {S}-matrix for black holes},
  date         = {1996-03-11},
  version      = 1,
  langid       = {english},
  langidopts   = {variant=american},
  eprinttype   = {arxiv},
  eprint       = {hep-th/9603067},
  annotation   = {An \texttt{online} reference from arXiv. Note the
                  \texttt{eprint} and \texttt{eprinttype} fields. Also note that
                  the arXiv reference is transformed into a clickable link if
                  \texttt{hyperref} support has been enabled},
  abstract     = {We discuss the limitations of 't Hooft's proposal for the
                  black hole S-matrix. We find that the validity of the S-matrix
                  implies violation of the semi-classical approximation at
                  scales large compared to the Planck scale. We also show that
                  the effect of the centrifugal barrier on the S-matrix is
                  crucial even for large transverse distances.},
}

@online{markey,
  author       = {Markey, Nicolas},
  title        = {Tame the {BeaST}},
  date         = {2005-10-16},
  url          = {http://mirror.ctan.org/info/bibtex/tamethebeast/ttb_en.pdf},
  subtitle     = {The {B} to {X} of {BibTeX}},
  version      = {1.3},
  urldate      = {2006-10-01},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Tame the Beast},
  annotation   = {An \texttt{online} entry for a tutorial. Note the format of
                  the \texttt{date} field (\texttt{yyyy-mm-dd}) in the database
                  file.},
}

@online{wassenberg,
  author       = {Wassenberg, Jan and Sanders, Peter},
  title        = {Faster Radix Sort via Virtual Memory and Write-Combining},
  date         = {2010-08-17},
  version      = 1,
  langid       = {english},
  langidopts   = {variant=american},
  eprinttype   = {arxiv},
  eprintclass  = {cs.DS},
  eprint       = {1008.2849v1},
  annotation   = {A recent \texttt{online} reference from arXiv using the new
                  (April 2007 onward) identifier format. Note the
                  \texttt{eprint}, \texttt{eprinttype}, and \texttt{eprintclass}
                  fields. Also note that the arXiv reference is transformed into
                  a clickable link if \texttt{hyperref} support has been
                  enabled},
  abstract     = {Sorting algorithms are the deciding factor for the performance
                  of common operations such as removal of duplicates or database
                  sort-merge joins. This work focuses on 32-bit integer keys,
                  optionally paired with a 32-bit value. We present a fast radix
                  sorting algorithm that builds upon a microarchitecture-aware
                  variant of counting sort},
}

@patent{almendro,
  author       = {Almendro, Jos{\'e} L. and Mart{\'i}n, Jacinto and S{\'a}nchez,
                  Alberto and Nozal, Fernando},
  title        = {Elektromagnetisches Signalhorn},
  number       = {EU-29702195U},
  date         = 1998,
  location     = {countryfr and countryuk and countryde},
  langid       = {german},
  annotation   = {This is a \texttt{patent} entry with a \texttt{location}
                  field. The number is given in the \texttt{number} field. Note
                  the format of the \texttt{location} field in the database
                  file. Compare \texttt{laufenberg}, \texttt{sorace}, and
                  \texttt{kowalik}},
}

@patent{kowalik,
  author       = {Kowalik, F. and Isard, M.},
  title        = {Estimateur d'un d{\'e}faut de fonctionnement d'un modulateur
                  en quadrature et {\'e}tage de modulation l'utilisant},
  number       = 9500261,
  date         = {1995-01-11},
  type         = {patreqfr},
  langid       = {french},
  indextitle   = {Estimateur d'un d{\'e}faut de fonctionnement},
  annotation   = {This is a \texttt{patent} entry for a French patent request
                  with a full date. The number is given in the \texttt{number}
                  field. Note the format of the \texttt{type} and \texttt{date}
                  fields in the database file. Compare \texttt{almendro},
                  \texttt{laufenberg}, and \texttt{sorace}},
}

@patent{laufenberg,
  author       = {Laufenberg, Xaver and Eynius, Dominique and Suelzle, Helmut
                  and Usbeck, Stephan and Spaeth, Matthias and Neuser-Hoffmann,
                  Miriam and Myrzik, Christian and Schmid, Manfred and Nietfeld,
                  Franz and Thiel, Alexander and Braun, Harald and Ebner,
                  Norbert},
  title        = {Elektrische Einrichtung und Betriebsverfahren},
  number       = 1700367,
  date         = {2006-09-13},
  holder       = {{Robert Bosch GmbH} and {Daimler Chrysler AG} and {Bayerische
                  Motoren Werke AG}},
  type         = {patenteu},
  langid       = {german},
  annotation   = {This is a \texttt{patent} entry with a \texttt{holder} field.
                  Note the format of the \texttt{type} and \texttt{location}
                  fields in the database file. Compare \texttt{almendro},
                  \texttt{sorace}, and \texttt{kowalik}},
  abstract     = {The invention relates to an electric device comprising a
                  generator, in particular for use in the vehicle electric
                  system of a motor vehicle and a controller for controlling the
                  generator voltage. The device is equipped with a control zone,
                  in which the voltage is controlled and zones, in which the
                  torque is controlled. The invention also relates to methods
                  for operating a device of this type.},
  file         = {http://v3.espacenet.com/textdoc?IDX=EP1700367},
}

@patent{sorace,
  author       = {Sorace, Ronald E. and Reinhardt, Victor S. and Vaughn, Steven
                  A.},
  title        = {High-Speed Digital-to-{RF} Converter},
  number       = 5668842,
  date         = {1997-09-16},
  holder       = {{Hughes Aircraft Company}},
  type         = {patentus},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {This is a \texttt{patent} entry with a \texttt{holder} field.
                  Note the format of the \texttt{type} and \texttt{date} fields
                  in the database file. Compare \texttt{almendro},
                  \texttt{laufenberg}, and \texttt{kowalik}},
}

@periodical{jcg,
  title        = {Computers and Graphics},
  year         = 2011,
  issuetitle   = {Semantic {3D} Media and Content},
  volume       = 35,
  number       = 4,
  issn         = {0097-8493},
  annotation   = {This is a \texttt{periodical} entry with an \texttt{issn}
                  field.},
}

@report{chiu,
  author       = {Chiu, Willy W. and Chow, We Min},
  title        = {A Hybrid Hierarchical Model of a {Multiple Virtual Storage}
                  ({MVS}) Operating System},
  type         = {resreport},
  institution  = {IBM},
  date         = 1978,
  number       = {RC-6947},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {Hybrid Hierarchical Model of a Multiple Virtual Storage (MVS)
                  Operating System},
  indextitle   = {Hybrid Hierarchical Model, A},
  annotation   = {This is a \texttt{report} entry for a research report. Note
                  the format of the \texttt{type} field in the database file
                  which uses a localization key. The number of the report is
                  given in the \texttt{number} field. Also note the
                  \texttt{sorttitle} and \texttt{indextitle} fields},
}

@report{padhye,
  author       = {Padhye, Jitendra and Firoiu, Victor and Towsley, Don},
  title        = {A Stochastic Model of {TCP Reno} Congestion Avoidance and
                  Control},
  type         = {techreport},
  institution  = {University of Massachusetts},
  date         = 1999,
  number       = {99-02},
  location     = {Amherst, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  sorttitle    = {A Stochastic Model of TCP Reno Congestion Avoidance and
                  Control},
  indextitle   = {Stochastic Model of {TCP Reno} Congestion Avoidance and Control,
                  A},
  annotation   = {This is a \texttt{report} entry for a technical report. Note
                  the format of the \texttt{type} field in the database file
                  which uses a localization key. The number of the report is
                  given in the \texttt{number} field. Also note the
                  \texttt{sorttitle} and \texttt{indextitle} fields},
  abstract     = {The steady state performance of a bulk transfer TCP flow
                  (i.e. a flow with a large amount of data to send, such as FTP
                  transfers) may be characterized by three quantities. The first
                  is the send rate, which is the amount of data sent by the
                  sender in unit time. The second is the throughput, which is
                  the amount of data received by the receiver in unit time. Note
                  that the throughput will always be less than or equal to the
                  send rate due to losses. Finally, the number of non-duplicate
                  packets received by the receiver in unit time gives us the
                  goodput of the connection. The goodput is always less than or
                  equal to the throughput, since the receiver may receive two
                  copies of the same packet due to retransmissions by the
                  sender. In a previous paper, we presented a simple model for
                  predicting the steady state send rate of a bulk transfer TCP
                  flow as a function of loss rate and round trip time. In this
                  paper, we extend that work in two ways. First, we analyze the
                  performance of bulk transfer TCP flows using more precise,
                  stochastic analysis. Second, we build upon the previous
                  analysis to provide both an approximate formula as well as a
                  more accurate stochastic model for the steady state throughput
                  of a bulk transfer TCP flow.},
  file         = {ftp://gaia.cs.umass.edu/pub/Padhey99-markov.ps},
}

@thesis{geer,
  author       = {de Geer, Ingrid},
  title        = {Earl, Saint, Bishop, Skald~-- and Music},
  type         = {phdthesis},
  institution  = {Uppsala Universitet},
  date         = 1985,
  subtitle     = {The {Orkney Earldom} of the Twelfth Century. {A} Musicological
                  Study},
  location     = {Uppsala},
  options      = {useprefix=false},
  langid       = {english},
  langidopts   = {variant=british},
  annotation   = {This is a typical \texttt{thesis} entry for a PhD thesis. Note
                  the \texttt{type} field in the database file which uses a
                  localization key. Also note the format of the printed name and
                  compare the \texttt{useprefix} option in the \texttt{options}
                  field as well as \texttt{vangennep}},
}

@thesis{loh,
  author       = {Loh, Nin C.},
  title        = {High-Resolution Micromachined Interferometric Accelerometer},
  type         = {mathesis},
  institution  = {Massachusetts Institute of Technology},
  date         = 1992,
  location     = {Cambridge, Mass.},
  langid       = {english},
  langidopts   = {variant=american},
  annotation   = {This is a typical \texttt{thesis} entry for an MA thesis. Note
                  the \texttt{type} field in the database file which uses a
                  localization key},
}
                  `