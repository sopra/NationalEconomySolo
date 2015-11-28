class HandSpace extends SpaceBase
  @DIV_ID = "hand"

  # 選択状態
  @SELECT_NOT   = 0
  @SELECT_LEFT  = 1
  @SELECT_RIGHT = 2

  @cards : []
  @select : []

  @init:->
    super()
    @cards  = []
    @select = []

  # 選択状態を取得
  @getSelect:(index)->
    @select[index]
  # 選択状態を変更
  @clickLeft:(index)->
    if @select[index] is @SELECT_LEFT
      @select[index] = @SELECT_NOT
    else
      @select[index] = @SELECT_LEFT
  @clickRight:(index)->
    if @select[index] is @SELECT_RIGHT
      @select[index] = @SELECT_NOT
    else
      @select[index] = @SELECT_RIGHT

  # ソートする
  @sort:->
    @cards.sort()
    @select = []
    @select.push @SELECT_NOT for i in [0...@cards.length]

  # 手札を増やす
  @push:(cardNum)->
    @cards.push Number cardNum
    @select.push @SELECT_NOT

  # 描画
  @redraw:->
    me = @getElement()

    me.html('')
    for index in [0...@cards.length]
      e = @createElement index
      me.append e if e isnt false
      e.addClass "select_left"  if @select[index] is @SELECT_LEFT
      e.addClass "select_right" if @select[index] is @SELECT_RIGHT

  # 要素作成
  @createElement:(index)->
    # ハンドになければ脱出
    return false unless @cards[index]?

    # カードのクラス
    cardClass = Card.getClass @cards[index]
    # カード名
    name = cardClass.getName()
    # カテゴリ
    cat = cardClass.getCategory()
    # コスト
    cost = cardClass.getCost()
    # 売却価格
    price = cardClass.getPrice()
    # 得点
    point = cardClass.getPoint()
    # 説明文
    desc = cardClass.getDescription()

    # カードの外側
    e = $('<div>').attr('data-index', index).addClass('hand')

    # ヘッダ
    # [コスト]カード名
    header = $('<span>').addClass('hand_header').html('['+cost+']'+cardClass.getName())

    # 画像
    img = cardClass.getImageObj().addClass('hand_image')

    # フッタ
    # カテゴリ
    catStr = if cat? then '['+cat+']' else ''
    categorySpan = $('<span>').addClass('hand_footer hand_category').html(catStr)
    # 得点
    pointSpan = $('<span>').addClass('hand_footer hand_point').html('[$'+point+']')

    # 説明の吹き出し
    catBalloon = if cat? then cat else 'なし'
    balloonStr = """
    #{desc}
    --------------------
    カテゴリ：#{catBalloon}
    コスト：#{cost}
    売却価格：#{price}
    得点：#{point}
    """.replace /\n/g, '<br>'
    e.attr('data-tooltip', balloonStr).darkTooltip()

    # 選択状態にする
    e.on 'click', ->
      index = $(this).attr('data-index')
      Game.handClickLeft index
    e.on 'contextmenu', ->
      index = $(this).attr('data-index')
      Game.handClickRight index

    e.append header
    e.append img
    e.append categorySpan
    e.append pointSpan
    e
