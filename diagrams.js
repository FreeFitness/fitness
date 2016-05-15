setTimeout(
    function() 
    {
        function getColData(col){
            var resultCol = [];
            jQuery("#strength_table tr").each(function (i, el) {
                var $tds = $(this).find("td:nth-child(" + col + ")");
                if ($tds.text() != "") {
                    resultCol.push($tds.text());
                }

            });
            return resultCol;
        };


        angular.element(document).ready(function () {
            new Chartist.Line('#chart1', {
                labels: getColData(1),
                series: [
                    {
                        name: 'Chinups',
                        data: getColData(2)
                    },
                    {
                        name: 'Pushups',
                        data: getColData(3)
                    },
                    {
                        name: 'Pullups',
                        data: getColData(4)
                    }]
            }, {
                fullWidth: true
            }
                             );
        });
    }, 1000);
